import axios from 'axios';
import api from './api';

export async function validateEmail(email: string, takenExpected: boolean, message: string): Promise<string> {
  if (!email) {
    return "Email is required"
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  ) {
    return "Email is invalid"
  }

  let error: string = ''
  await axios.post(api.checkEmail, { email })
    .then(({ data }) => {
      const taken: boolean = data.taken
      if (taken != takenExpected)
        error = message
    })
    .catch(_ => console.log('Unable to reach server'))
  return error
}