import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '@services/user'
import { IUser } from '@type/models'
import { IApiResponse } from '@type/apiResponse'
import { updateCache, updateInfiniteCache } from '@utils'
import removeItemFromArray from '@utils/RemoveItemFromArray'
import { useGetUser } from '@hooks'

interface UseDeleteUserReturn {
  deleteUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
}

const useDeleteUser = (): UseDeleteUserReturn => {
  const queryClient = useQueryClient()
  const { queryUserKey, infiniteUserQueryKey, reCallQuery } = useGetUser()

  const deleteUserMutation = useMutation({
    mutationFn: (variables: IUser) => deleteUser(variables.id),
    onSuccess: (response) => {
      if (response.data) {
        updateCache<IUser>(queryClient, queryUserKey, (data) => removeItemFromArray(data, response.data!.id))
        updateInfiniteCache<IUser>(queryClient, infiniteUserQueryKey, (page) => ({
          ...page,
          data: removeItemFromArray(page.data, response.data!.id)
        }))

        return
      }

      reCallQuery()
    }
  })

  return {
    deleteUserMutation
  }
}

export default useDeleteUser
