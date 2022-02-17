async function createMeme() {}
async function getAllMemes() {}
async function getMeme(req, res) {
  console.log(res.json({ test: 'test' }))
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
