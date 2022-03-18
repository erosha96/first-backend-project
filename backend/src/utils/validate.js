import createError from 'http-errors'
import * as yup from 'yup'

export const validate =
  (bodySchema = yup.object(), querySchema = yup.object(), paramsSchema = yup.object()) =>
  async (req, res, next) => {
    console.log(req.body)
    try {
      await bodySchema.validate(req.body)
      await querySchema.validate(req.query)
      await paramsSchema.validate(req.params)
      next()
    } catch (e) {
      console.log(e)
      next(createError.BadRequest(e))
    }
  }
