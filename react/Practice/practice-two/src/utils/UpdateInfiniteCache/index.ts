import { InfiniteData, QueryClient } from '@tanstack/react-query'

export interface UserQueryData<T> {
  data: T[]
  page: number
  limit: number
}

const updateInfiniteCache = <T>(
  queryClient: QueryClient,
  queryKey: (string | number)[],
  updateFn: (page: UserQueryData<T>) => UserQueryData<T>
) => {
  const existingData = queryClient.getQueryData<InfiniteData<UserQueryData<T>>>(queryKey)
  if (!existingData) {
    queryClient.invalidateQueries({ queryKey })
    return
  }

  queryClient.setQueryData<InfiniteData<UserQueryData<T>>>(queryKey, (oldData) => {
    if (!oldData) return existingData

    const updatedPages = oldData.pages.map((page) => ({
      ...page,
      data: updateFn(page).data
    }))

    return {
      ...oldData,
      pages: updatedPages,
      pageParams: oldData.pageParams
    }
  })
}

export default updateInfiniteCache
