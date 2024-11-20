import { FormEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  AdditionalCard,
  AdditionalDes,
  AdditionalIcon,
  HomeStyled,
  WrapperBtn,
  WrapperPopup,
  WrapperProducts
} from './Home.styled'

import { Form, Loader, ProductCard, TextField, ToastMessage, FetchError } from '@components'
import { Button } from '@components/common'
import { useProduct } from '@components/hooks/useProduct'
import useToast from '@components/hooks/useToast'
import { IToastMessage } from '@components/ToastMessage'

import plus from '@assets/icons/plus.svg'
import { IProduct } from '@type/product'

import {
  checkImageURL,
  checkName,
  checkPrice,
  checkQuantity,
  restrictIntegerInput,
  restrictRealNumberInput
} from '@utilities'

const errorMessagesDefault = { name: '', price: '', quantity: '', imageURL: '' }
const Home = () => {
  const queryClient = useQueryClient()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const sort = queryParams.get('sort') || ''
  const property = queryParams.get('property') || ('name' as keyof IProduct)
  const q = queryParams.get('q') || ''
  const { submitProduct, deleteProduct, fetchProducts } = useProduct()
  const { addToast } = useToast()
  const [chosenProduct, setChosenProduct] = useState<IProduct | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [errorMessage, setErrorMessage] = useState(errorMessagesDefault)

  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await deleteProduct(productId)
      addToast({
        status: response.status as IToastMessage['status'],
        message: response.message
      })
      return response
    },
    onSuccess: (response) => {
      if (response.status === 'success' && response.data) {
        queryClient.setQueryData(
          ['products', { sort, property, q }],
          (oldData: { pages: IProduct[][]; pageParams: number[] }) => {
            // If there's no old data or no pages, return the current state (empty array)
            if (!oldData || !oldData.pages) return { pages: [], pageParams: oldData.pageParams }
            // Remove the product from the pages by filtering out the deleted product
            const updatedPages = oldData.pages.map((page) => page.filter((product) => product.id !== response.data!.id))

            // Return the updated pages structure
            return {
              ...oldData, // Keep the previous page parameters
              pages: updatedPages // Update the pages with the modified product list
            }
          }
        )
      }
    },
    onError: (error) => {
      console.error('Error deleting product:', error)
    }
  })

  const submitMutation = useMutation({
    mutationFn: submitProduct,
    onSuccess: (response) => {
      addToast({
        status: response.status as IToastMessage['status'],
        message: response.message
      })
      if (response.status === 'success' && response.data) {
        queryClient.setQueryData(
          ['products', { sort, property, q }],
          (oldData: { pages: IProduct[][]; pageParams: number[] }) => {
            // If there's no old data or no pages, return a new array with the updated product
            if (!oldData || !oldData.pages) return { pages: [[response.data!]], pageParams: oldData.pageParams }
            // Go through each page and find the page where the product should be updated
            const updatedPages = oldData.pages.map((page) => {
              const productExists = page.some((product) => product.id === response.data!.id)

              if (productExists) {
                // If the product exists on this page, update it
                return page.map((product) => (product.id === response.data!.id ? response.data! : product))
              } else {
                // If the product doesn't exist, return the page as is
                return page
              }
            })

            // Now, you should return the updated pages structure
            return {
              ...oldData, // Keep the previous page parameters
              pages: updatedPages // Update the pages with the modified product list
            }
          }
        )
      }
    },
    onSettled: () => {
      setShowPopup(false)
      setShowLoader(false)
    }
  })

  const {
    data: productList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    error
  } = useInfiniteQuery({
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
    getNextPageParam: (data, allPages) => {
      if (allPages && data && allPages.length * 10 - data.length === 1) {
        return allPages.length * 10 + 9
      }
      return undefined
    },
    staleTime: 300000
  })

  const handleShowForm = () => {
    setShowPopup(true)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowPopup(false)
    setShowForm(false)
    setChosenProduct(null)
    setErrorMessage(errorMessagesDefault)
  }

  const handleShowWarning = (product: IProduct) => {
    setChosenProduct(product)
    setShowPopup(true)
    setShowWarning(true)
  }

  const handleCloseWarning = () => {
    setShowPopup(false)
    setShowWarning(false)
  }

  const handleShowEditForm = (product: IProduct) => {
    setChosenProduct(product)
    handleShowForm()
  }

  const handleDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const productId = formData.get('id') as string | null

    if (productId) {
      setShowPopup(true)
      setShowLoader(true)
      deleteMutation.mutate(productId)
      setShowPopup(false)
      setShowLoader(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newProduct: IProduct = { id: '', name: '', imageURL: '', price: '', quantity: '' }
    const formData = new FormData(event.target as HTMLFormElement)
    for (const [key, value] of formData.entries()) {
      if (key in newProduct) {
        newProduct[key as keyof IProduct] = value as string
      }
    }

    const errors = {
      name: checkName('Name', newProduct.name) || '',
      price: checkPrice('Price', newProduct.price) || '',
      quantity: checkQuantity('Quantity', newProduct.quantity) || '',
      imageURL: (await checkImageURL('Image URL', newProduct.imageURL)) || ''
    }
    setErrorMessage(errors)

    const hasErrors = Object.values(errors).some((error) => error !== '')
    if (hasErrors) return

    handleCloseForm()
    setShowPopup(true)
    setShowLoader(true)
    submitMutation.mutate(newProduct)
  }

  if (isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return (
      <h2>
        Something went wrong<p>. Error: {error.message}</p>
      </h2>
    )
  }

  return (
    <HomeStyled>
      {Array.isArray(productList?.pages) && productList.pages.length > 0 ? (
        <>
          <WrapperProducts className='container'>
            <AdditionalCard onClick={handleShowForm}>
              <AdditionalIcon src={plus} alt='add food' />
              <AdditionalDes>Add new dish</AdditionalDes>
            </AdditionalCard>
            {productList.pages[productList.pages.length - 1].map(
              ({ id, name, imageURL, price, quantity }: IProduct) => (
                <ProductCard
                  key={id}
                  id={id}
                  name={name}
                  imageURL={imageURL}
                  price={price}
                  quantity={quantity}
                  onEdit={() => handleShowEditForm({ id, name, imageURL, price, quantity })}
                  onDelete={() => handleShowWarning({ id, name, imageURL, price, quantity })}
                />
              )
            )}
          </WrapperProducts>
          <WrapperBtn>
            <Button
              variant='primary'
              title={isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            />
          </WrapperBtn>
        </>
      ) : (
        <FetchError title='No results found' />
      )}

      {showPopup && (
        <WrapperPopup className='container-fluid'>
          {showForm && (
            <Form
              handleCancel={handleCloseForm}
              onSubmit={handleSubmit}
              title={chosenProduct?.id ? 'Edit' : 'Add new food'}
              className='slide-down'
            >
              <TextField
                key={chosenProduct?.id}
                type='hidden'
                name='id'
                value={chosenProduct?.id ? chosenProduct.id : ''}
              />
              <TextField
                name='name'
                label='Name'
                value={chosenProduct?.name ? chosenProduct.name : ''}
                errorMessage={errorMessage.name}
              />
              <TextField
                name='imageURL'
                label='Image URL'
                value={chosenProduct?.imageURL ? chosenProduct.imageURL : ''}
                errorMessage={errorMessage.imageURL}
              />
              <TextField
                name='price'
                label='Price'
                value={chosenProduct?.price ? chosenProduct.price : ''}
                errorMessage={errorMessage.price}
                onKeyDown={(e) => restrictRealNumberInput(e)}
              />
              <TextField
                name='quantity'
                label='Quantity'
                dimension='sm'
                value={chosenProduct?.quantity ? chosenProduct.quantity : ''}
                errorMessage={errorMessage.quantity}
                onKeyDown={(e) => restrictIntegerInput(e)}
              />
            </Form>
          )}
          {showWarning && (
            <Form
              title='Are you sure you want to delete this food?'
              onSubmit={handleDelete}
              handleCancel={handleCloseWarning}
              bottomBorderTitle={false}
              className='slide-down center-title'
            >
              <TextField
                key={chosenProduct?.id}
                type='hidden'
                name='id'
                value={chosenProduct?.id ? chosenProduct.id : ''}
              />
            </Form>
          )}
          {showLoader && <Loader />}
        </WrapperPopup>
      )}
      <ToastMessage className='slide-down' />
    </HomeStyled>
  )
}

export default Home
