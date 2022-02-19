import createError from 'http-errors'
import * as yup from 'yup'

export const validate =
  (bodySchema = yup.object(), querySchema = yup.object(), paramsSchema = yup.object()) =>
  async (req, res, next) => {
    try {
      await bodySchema.validate(req.body)
      await querySchema.validate(req.query)
      await paramsSchema.validate(req.params)
      next()
    } catch (e) {
      next(createError.BadRequest())
    }
  }
