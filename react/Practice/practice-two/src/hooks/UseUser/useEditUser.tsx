import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { editUser } from '@services/user'
import { IUser } from '@type/models'
import { IApiResponse } from '@type/apiResponse'
import { updateCache, updateInfiniteCache, updateItemInArray } from '@utils'
import { useGetUser } from '@hooks'

interface UseEditUserReturn {
  editUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
}

const useEditUser = (): UseEditUserReturn => {
  const queryClient = useQueryClient()
  const { queryUserKey, infiniteUserQueryKey, reCallQuery } = useGetUser()

  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: (response) => {
      if (response.data) {
        updateCache<IUser>(queryClient, queryUserKey, (data) => updateItemInArray(data, response.data!))
        updateInfiniteCache<IUser>(queryClient, infiniteUserQueryKey, (page) => ({
          ...page,
          data: updateItemInArray(page.data, response.data!)
        }))

        return
      }

      reCallQuery()
    }
  })

  return {
    editUserMutation
  }
}

export default useEditUser
