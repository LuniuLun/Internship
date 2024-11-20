import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useProduct } from '@components/hooks/useProduct'
import { IProduct } from '@type/product'
import { IToastMessage } from '@components/ToastMessage'
import useToast from '@components/hooks/useToast'
import { ACTIONS } from '@type/actions'

interface IHomeQueriesProps {
  setShowPopup: (value: boolean) => void
  setShowLoader: (value: boolean) => void
  queryParams: URLSearchParams
}

interface IPageProps {
  pages: IProduct[][]
  pageParams: number[]
}

export const useHomeQueries = ({ queryParams, setShowPopup, setShowLoader }: IHomeQueriesProps) => {
  const queryClient = useQueryClient()
  const { submitProduct, deleteProduct, fetchProducts } = useProduct()
  const { addToast } = useToast()

  // Extract query parameters
  const sort = queryParams.get('sort') || ''
  const property = queryParams.get('property') || ('name' as keyof IProduct)
  const q = queryParams.get('q') || ''

  // Helper function to update query data
  const updateProductCache = (updatedProduct: IProduct, action: ACTIONS) => {
    queryClient.setQueryData(['products', { sort, property, q }], (oldData: IPageProps | undefined) => {
      if (!oldData || !oldData.pages) return { pages: [], pageParams: [] }

      let updatedPages

      switch (action) {
        case ACTIONS.DELETE:
          updatedPages = oldData.pages.map((page) => page.filter((product) => product.id !== updatedProduct.id))
          break

        case ACTIONS.UPDATE:
          updatedPages = oldData.pages.map((page) =>
            page.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
          )
          break

        case ACTIONS.ADD:
          updatedPages = oldData.pages.map((page) => [updatedProduct, ...page])
          break

        default:
          updatedPages = oldData.pages
      }

      console.log(updatedPages)
      return { ...oldData, pages: updatedPages }
    })
  }

  // Mutation for deleting a product
  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await deleteProduct(productId)
      addToast({ status: response.status as IToastMessage['status'], message: response.message })
      return response
    },
    onSuccess: (response) => {
      if (response.status === 'success' && response.data) {
        updateProductCache(response.data, ACTIONS.DELETE)
      }
    },
    onError: (error) => console.error('Error deleting product:', error)
  })

  // Mutation for submitting a product
  const submitMutation = useMutation({
    mutationFn: submitProduct,
    onSuccess: (response) => {
      addToast({ status: response.status as IToastMessage['status'], message: response.message })
      if (response.status === 'success' && response.data) {
        const updatedProduct = response.data
        const cachedData: IPageProps | undefined = queryClient.getQueryData(['products', { sort, property, q }])
        console.log(cachedData)

        if (cachedData) {
          const isProductExist = cachedData.pages.some((page) =>
            page.some((product) => product.id === updatedProduct.id)
          )
          console.log(isProductExist)

          updateProductCache(updatedProduct, isProductExist ? ACTIONS.UPDATE : ACTIONS.ADD)
        }
      }
    },
    onSettled: () => {
      setShowPopup(false)
      setShowLoader(false)
    }
  })
  // Infinite query for fetching products
  const infiniteQuery = useInfiniteQuery({
    queryKey: ['products', { sort, property, q }],
    queryFn: async ({ pageParam = 9 }) => {
      const response = await fetchProducts({
        typeOfSort: sort === 'AToZ' || sort === 'ZToA' ? sort : undefined,
        property: property as keyof IProduct,
        value: q,
        limit: pageParam.toString()
      })
      return response.data
    },
    initialPageParam: 9,
    getNextPageParam: (data, allPages) =>
      allPages && data && allPages.length * 10 - data.length === 1 ? allPages.length * 10 + 9 : undefined,
    staleTime: 300000
  })

  return { deleteMutation, submitMutation, infiniteQuery, queryClient, sort, property, q }
}
