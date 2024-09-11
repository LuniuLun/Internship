type TApiResponse<T> = {
  status: string
  data?: T
  message: string
}
