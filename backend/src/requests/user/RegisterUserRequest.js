import * as yup from 'yup'

export const RegisterUserRequest = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(25)
    .matches(/^[a-z0-9]+$/)
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(6)
})
