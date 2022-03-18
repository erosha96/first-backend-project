import { imageSizes } from '../../config/file.js'

const fileMapper = (meme, scope) => {
  switch (scope) {
    case 'full':
      return fullFileMapper(meme)
    case 'limited':
      return limitedFileMapper(meme)
  }
}

const fullFileMapper = ({ id }) => ({
  id,
  ...generateUrls(id)
})
const limitedFileMapper = ({ id }) => ({
  ...generateUrls(id)
})

const generateUrls = (id) => {
  console.log(id)
  const urls = {
    src: `../storage/files/processed/${id}.jpg`
  }
  imageSizes.forEach((size) => {
    urls[`thumbnail${size}`] = `../storage/files/resized/${size}/${id}.jpg`
  })
  console.log(urls)
  return urls
}
export { fileMapper }
