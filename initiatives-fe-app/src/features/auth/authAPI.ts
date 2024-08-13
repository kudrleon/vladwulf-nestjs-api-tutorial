import { be_base_url } from "../../utils/consts"

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
