import { fileMapper } from '../file/fileMapper.js'
import { tagCollectionMapper } from '../tag/tagMapper.js'
import { userMapper } from '../user/userMapper.js'

const memeMapper = (meme, scope) => {
  switch (scope) {
    case 'self-user':
      return selfUserMemeMapper(meme)
    case 'user':
      return userMemeMapper(meme)
    default:
      return shortMemeMapper(meme)
  }
}

const memeCollectionMapper = (memeCollection, scope) => {
  return memeCollection.map((u) => memeMapper(u, scope))
}

const shortMemeMapper = ({ id, title, file }) => ({
  id,
  title,
  file: file ? fileMapper(file, 'limited') : undefined
})

const selfUserMemeMapper = ({ id, title, file, tags, user }) => ({
  id,
  title,
  file: file ? fileMapper(file, 'full') : null,
  tags: tags?.length ? tagCollectionMapper(tags) : [],
  user: user ? userMapper(user, 'limited') : undefined
})
const userMemeMapper = ({ id, title, file, tags, user }) => ({
  id,
  title,
  file: file ? fileMapper(file, 'limited') : null,
  tags: tags?.length ? tagCollectionMapper(tags) : [],
  user: user ? userMapper(user, 'limited') : undefined
})

export { memeMapper, memeCollectionMapper }
