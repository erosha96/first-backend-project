import File from '../models/File'

async function upload(req, res) {
  const file = req.file

  const fileModel = await File.create({
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  })

  res.send('test')
}

export default {
  upload
}
