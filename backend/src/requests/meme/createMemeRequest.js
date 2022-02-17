import * as yup from 'yup'

export const CreateMemeRequest = yup.object().shape({
  fileId: yup.string().uuid()
})
