import File from '../models/File'
import * as fs from 'fs'
import { availableUploadedFileExtensions, availableUploadedFileMimetypes } from '../config/file.js'
import createError from 'http-errors'
import { createFile, createImageFile } from '../utils/files/filesWorker.js'
import { fileMapper } from '../resources/file/fileMapper'

async function upload(req, res) {
  const file = req.file
  const extension = /[^\\]*\.([\w\d]+)$/.exec(file.originalname)[1]

  if (!availableUploadedFileExtensions.includes(extension)) {
    throw createError.BadRequest('Unsupported file extension')
  }
  if (!availableUploadedFileMimetypes.includes(file.mimetype)) {
    throw createError.BadRequest('Unsupported file mimetype')
  }

  const fileModelInstance = await File.create({
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  })

  await createFile(file, fileModelInstance.id)

  try {
    if (file.mimetype.includes('image')) {
      await createImageFile(file, fileModelInstance.id)
    }
  } catch {
    throw createError.BadRequest('File is not image or corrupted')
  }

  res.send({ file: fileMapper(fileModelInstance, 'full') })
}

export default {
  upload
}
