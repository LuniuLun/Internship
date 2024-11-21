// handlers/homeHandlers.ts
import { useState, FormEvent } from 'react'
import { IProduct } from '@type/product'
import { UseMutationResult } from '@tanstack/react-query'
import { IApiResponse } from '@type/apiResponse'

const errorMessagesDefault = { name: '', price: '', quantity: '', imageURL: '' }

export interface UseHomeHandlersProps {
  setShowPopup: (value: boolean) => void
  setShowLoader: (value: boolean) => void
  deleteMutation: UseMutationResult<IApiResponse<IProduct>, Error, string, unknown>
  submitMutation: UseMutationResult<IApiResponse<IProduct>, Error, IProduct, unknown>
}

export const useHomeHandlers = ({
  setShowPopup,
  setShowLoader,
  deleteMutation,
  submitMutation
}: UseHomeHandlersProps) => {
  const [chosenProduct, setChosenProduct] = useState<IProduct | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [errorMessage, setErrorMessage] = useState(errorMessagesDefault)

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
    }
  }

  const handleSubmit = async (data: IProduct) => {
    handleCloseForm()
    setShowPopup(true)
    setShowLoader(true)
    submitMutation.mutate(data)
  }

  return {
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
  }
}
