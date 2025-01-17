import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchUsers, fetchAllUsers } from '@services/user'
import { IUser, TransformedUser } from '@type/models'
import { filterStore } from '@stores'
import { useShallow } from 'zustand/shallow'
import { filterUsersByRole, userSummaryTable } from '@utils'

interface UseGetUserReturn {
  superAdmin: IUser[] | undefined
  admin: IUser[] | undefined
  employee: IUser[] | undefined
  transformedUsers: TransformedUser[] | undefined
  transformAllUsers: IUser[] | undefined
  usersQuery: ReturnType<typeof useInfiniteQuery>
  allUsersQuery: ReturnType<typeof useQuery>
  lengthAllUsers: number
  infiniteUserQueryKey: (string | number)[]
  queryUserKey: (string | number)[]
  reCallQuery: () => void
}

const useGetUser = (): UseGetUserReturn => {
  const { searchQuery, sortBy, itemsPerPage } = filterStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      sortBy: state.sortBy,
      itemsPerPage: state.itemsPerPage
    }))
  )
  const queryClient = useQueryClient()
  const infiniteUserQueryKey = ['users', itemsPerPage, searchQuery, sortBy]
  const queryUserKey = ['allUsers', searchQuery]

  const usersQuery = useInfiniteQuery({
    queryKey: infiniteUserQueryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchUsers({
        page: pageParam.toString(),
        limit: itemsPerPage.toString(),
        property: 'firstName',
        value: searchQuery,
        sortBy,
        order: 'asc'
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.data || lastPage.data.length === 0) return undefined
      return lastPageParam + 1
    },

    refetchOnWindowFocus: false
  })

  const allUsersQuery = useQuery({
    queryKey: queryUserKey,
    queryFn: () => fetchAllUsers('firstName', searchQuery),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  const lengthAllUsers = useMemo(() => {
    return allUsersQuery?.data?.data?.length || 0
  }, [allUsersQuery.data])

  const transformedUsers = useMemo(() => {
    if (!usersQuery.data) return []

    return usersQuery.data.pages.flatMap((page) => {
      if (!page.data) return []

      return userSummaryTable(page.data)
    })
  }, [usersQuery.data])

  const transformAllUsers = useMemo(() => {
    if (!usersQuery.data) return []

    return usersQuery.data.pages.flatMap((page) => {
      if (!page.data) return []

      return page.data.map((user: IUser) => {
        return {
          ...user
        }
      })
    })
  }, [usersQuery.data])

  const { superAdmin, admin, employee } = useMemo(() => {
    if (!allUsersQuery.data || !allUsersQuery.data.data) return { superAdmin: [], admin: [], employee: [] }

    return filterUsersByRole(allUsersQuery.data.data)
  }, [allUsersQuery.data])

  const reCallQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryUserKey })
    queryClient.invalidateQueries({ queryKey: infiniteUserQueryKey })
  }

  return {
    superAdmin,
    admin,
    employee,
    transformedUsers,
    transformAllUsers,
    usersQuery,
    allUsersQuery,
    lengthAllUsers,
    reCallQuery,
    infiniteUserQueryKey,
    queryUserKey
  }
}

export default useGetUser
