const userMapper = (user, scope) => {
  switch (scope) {
    case 'full':
      return fullUserMapper(user)
    case 'limited':
      return limitedUserMapper(user)
  }
}

const userCollectionMapper = (userCollection, scope) => {
  userCollection.map((u) => userMapper(u, scope))
}

const fullUserMapper = ({ id, username, email }) => ({
  id,
  username,
  email
})
const limitedUserMapper = ({ id, username }) => ({
  id,
  username
})

export { userMapper, userCollectionMapper }
