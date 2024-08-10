export const signUp = (userName: string, password: string) =>
  fetch(
    'http://localhost:3333/auth/signup',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userName, password }),
    }
  )
