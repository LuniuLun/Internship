import { useLocation } from 'react-router-dom'
import { useHomeQueries } from './hooks/homeQueries'
import { useHomeHandlers } from './hooks/homeHandlers'
import {
  HomeStyled,
  WrapperProducts,
  WrapperBtn,
  WrapperPopup,
  AdditionalCard,
  AdditionalIcon,
  AdditionalDes
} from './Home.styled'
import { ProductCard, Form, TextField, Loader, FetchError, ToastMessage } from '@components'
import { restrictIntegerInput, restrictRealNumberInput } from '@utilities'
import { IProduct } from '@type/product'
import plus from '@assets/icons/plus.svg'
import { Button } from '@components/common'
import { useState } from 'react'

const Home = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [showPopup, setShowPopup] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const { deleteMutation, submitMutation, infiniteQuery } = useHomeQueries({ setShowPopup, setShowLoader, queryParams })
  const {
    chosenProduct,
    showForm,
    showWarning,
    errorMessage,
    handleShowForm,
    handleCloseForm,
    handleShowWarning,
    handleCloseWarning,
    handleShowEditForm,
    handleDelete,
    handleSubmit
  } = useHomeHandlers({ setShowPopup, setShowLoader, deleteMutation, submitMutation })

  const {
    data: productList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    error
  } = infiniteQuery

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
