import { QueryClient } from '@tanstack/react-query'

interface AllQueryData<T> {
  data: T[]
}

const updateCache = <T>(queryClient: QueryClient, queryKey: (string | number)[], updateFn: (object: T[]) => T[]) => {
  const existingData = queryClient.getQueryData<AllQueryData<T>>(queryKey)

  if (!existingData) {
    queryClient.invalidateQueries({ queryKey })
    return
  }

  queryClient.setQueryData<AllQueryData<T>>(queryKey, (oldData) => {
    if (!oldData) return existingData

    const newData = updateFn(oldData.data)

    return {
      data: newData
    }
  })
}

export default updateCache
