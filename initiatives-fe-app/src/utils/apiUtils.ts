export const prepareHeaders = (headers: any, { getState }: any) => {
  const { token } = getState().auth
  if (token) {
    headers.set("authorization", `Bearer ${token}`)
    return headers
  }
}
