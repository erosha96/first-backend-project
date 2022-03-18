import * as yup from 'yup'

export const CreateMemeRequest = yup.object().shape({
  title: yup.string().trim().min(1).required(),
  fileId: yup.string().uuid(),
  tags: yup.array().of(
    yup
      .string()
      .trim()
      .matches(/^[\w\s\d]+$/)
  )
})
