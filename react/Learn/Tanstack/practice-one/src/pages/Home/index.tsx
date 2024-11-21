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
import { IProduct } from '@type/product'
import plus from '@assets/icons/plus.svg'
import { Button } from '@components/common'
import { useState } from 'react'
import ProductForm from './components/ProductForm'

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
            <ProductForm
              chosenProduct={chosenProduct ?? {}}
              handleSubmit={handleSubmit}
              handleCloseForm={handleCloseForm}
            />
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
