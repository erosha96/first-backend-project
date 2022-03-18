import * as yup from 'yup'

export const UpdateUserRequest = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(5)
    .max(25)
    .matches(/^[a-z0-9]+$/),
  email: yup.string().email()
})
