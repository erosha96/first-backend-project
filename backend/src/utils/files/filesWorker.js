import fs from 'fs'
import sharp from 'sharp'
import { imageSizes } from '../../config/file.js'

export async function createFile(file, id) {
  const extension = /[^\\]*\.([\w\d]+)$/.exec(file.originalname)[1]
  fs.writeFileSync(`../storage/files/original/${id}.${extension}`, file.buffer, {})
}

export async function createImageFile(file, id) {
  const promises = []
  const imageStream = await sharp(file.buffer, {
    failOnError: true
  })
  const { width = 0, height = 0 } = await imageStream.metadata()

  imageSizes.forEach((size) => {
    promises.push(
      (async () => {
        const buffer = await imageStream
          .clone()
          .resize(width <= height ? size : null, height < width ? size : null)
          .jpeg({ quality: 92 })
          .toBuffer()

        fs.writeFileSync(`../storage/files/resized/${size}/${id}.jpg`, buffer)
      })()
    )
  })

  promises.push(
    (async () => {
      const buffer = await imageStream.clone().jpeg({ quality: 92 }).toBuffer()

      fs.writeFileSync(`../storage/files/processed/${id}.jpg`, buffer)
    })()
  )

  await Promise.all(promises).catch((e) => console.error(e))
}
