import * as yup from 'yup'

export const UpdatePasswordRequest = yup.object().shape({
  password: yup.string().min(6).required()
})
