import { be_base_url } from "../../utils/consts";

export const signUp = (userName: string, password: string) =>
  fetch(
    `${be_base_url}/auth/signup`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userName, password }),
    }
  )
