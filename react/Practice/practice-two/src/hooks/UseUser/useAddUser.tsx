import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { addUser } from '@services/user'
import { IUser } from '@type/models'
import { IApiResponse } from '@type/apiResponse'
import { updateCache, updateInfiniteCache } from '@utils'
import { useGetUser } from '@hooks'

interface UseAddUserReturn {
  addUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
}

const useAddUser = (): UseAddUserReturn => {
  const queryClient = useQueryClient()
  const { queryUserKey, infiniteUserQueryKey, reCallQuery } = useGetUser()

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (response) => {
      if (response.data) {
        updateCache(queryClient, queryUserKey, (data) => [response.data!, ...data])
        updateInfiniteCache<IUser>(queryClient, infiniteUserQueryKey, (page) => ({
          ...page,
          data: [response.data!, ...page.data]
        }))
        return
      }

      reCallQuery()
    }
  })

  return {
    addUserMutation
  }
}

export default useAddUser
