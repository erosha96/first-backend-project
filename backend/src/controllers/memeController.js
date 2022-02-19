async function createMeme() {}
async function getAllMemes(req, res) {
  console.log(req.user)
  res.send(req.user.toJSON())
}
async function getMeme(req, res) {
  console.log(req.user)
}
async function updateMeme() {}
async function removeMeme() {}

export default {
  createMeme,
  getAllMemes,
  getMeme,
  updateMeme,
  removeMeme
}
