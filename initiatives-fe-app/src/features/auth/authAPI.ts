import { be_base_url } from "../../utils/consts"

// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>(resolve =>
    setTimeout(() => resolve({ data: amount }), 500),
  )
}

export const login = (userName: string, password: string) =>
  fetch(
    `${be_base_url}/auth/signin`, //Add something like axios and have base url there
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userName, password }),
    }
  )
