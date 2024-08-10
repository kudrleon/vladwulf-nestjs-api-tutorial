// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>(resolve =>
    setTimeout(() => resolve({ data: amount }), 500),
  )
}

export const login = (userName: string, password: string) => {
  return fetch(
    'http://localhost:8080/signin',
    {
      method: 'POST',
      body: JSON.stringify({ email: userName, password }),
    }
  )
}
