import File from '../models/File.js'
import createError from 'http-errors'
import Tag from '../models/Tag.js'
import Meme from '../models/Meme.js'
import { memeCollectionMapper, memeMapper } from '../resources/meme/memeMapper.js'
import User from '../models/User.js'
import MemeTag from '../models/MemeTag'
import { Op, QueryTypes } from 'sequelize'
import MemeUserStat from '../models/MemeUserStat.js'
import { sequelize } from '../models/index.js'

async function createMeme(req, res) {
  const { title, tags, fileId } = req.body

  const file = await File.findOne({ where: { id: fileId } })
  if (!file) {
    throw createError.BadRequest('File not found')
  }

  await Tag.bulkCreate(
    [
      ...tags.map((t) => ({
        title: t
      }))
    ],
    {
      updateOnDuplicate: ['title'],
      individualHooks: true
    }
  )

  const tagsCollection = await Tag.findAll({
    where: {
      title: tags
    },
    raw: true
  })

  const meme = await Meme.create({
    title: title,
    fileId: fileId,
    userId: req.user.id
  })

  await meme.setTags(tagsCollection.map((t) => t.id))

  const newMeme = await Meme.findOne({
    where: { id: meme.id },
    include: [
      {
        model: File,
        as: 'file'
      },
      {
        model: Tag,
        as: 'tags'
      }
    ]
  })

  res.send({ meme: memeMapper(newMeme, 'self-user') })
}
async function getAllMemes(req, res) {
  const { page = 1, perPage = 5, tags = [] } = req.body

  const offset = (page - 1) * perPage
  const limit = perPage

  const memeIds = await Meme.sequelize.query(
    'SELECT m.id\n' +
      'FROM memes m\n' +
      '    INNER JOIN (\n' +
      '        SELECT count(mt.tagId) as count, mt.memeId\n' +
      '            FROM memeTags mt\n' +
      `            INNER JOIN tags t on mt.tagId = t.id ${tags.length ? 'and t.title in (:tags)' : ''}\n` +
      '        GROUP BY mt.memeId\n' +
      '    ) as tmp on m.id = tmp.memeId\n' +
      'WHERE tmp.count = :tagsCount\n' +
      'LIMIT :offset,:limit',
    {
      type: QueryTypes.SELECT,
      replacements: {
        tagsCount: tags.length,
        tags,
        offset,
        limit
      }
    }
  )
  const memeTotal = await Meme.sequelize.query(
    'SELECT count(*) as total\n' +
      'FROM memes m\n' +
      '    INNER JOIN (\n' +
      '        SELECT count(mt.tagId) as count, mt.memeId\n' +
      '            FROM memeTags mt\n' +
      `           ${tags.length ? ' INNER JOIN tags t on mt.tagId = t.id and t.title in (:tags)' : ''}\n` +
      '        GROUP BY mt.memeId\n' +
      '    ) as tmp on m.id = tmp.memeId\n' +
      'WHERE tmp.count = :tagsCount',
    {
      type: QueryTypes.SELECT,
      replacements: {
        tagsCount: tags.length,
        tags
      }
    }
  )

  const memes = await Meme.findAll({
    where: {
      id: memeIds.map((m) => m.id)
    },
    attributes: {
      exclude: ['user']
    },
    include: ['file', 'user', 'tags']
  })

  const outputMemes = memes.map((m) => ({
    id: m.id,
    title: m.title,
    userId: m.userId,
    fileId: m.fileId,
    tagIds: m.tags.map((t) => t.id),
    createdAt: m.createdAt
  }))
  const outputUsers = memes.map((m) => m.user)
  const outputTags = memes.map((m) => m.tags)

  res.send({
    memes: outputMemes,
    tags: outputTags,
    users: outputUsers,
    total: memeTotal[0].total
  })
  /*res.send({ memes: memeCollectionMapper(memes.rows, 'user'), total: memes.count })*/
}
async function getMeme({ params: { id } }, res) {
  const meme = await Meme.findOne({
    where: { id },
    include: [
      {
        model: File,
        as: 'file'
      },
      {
        model: Tag,
        as: 'tags'
      },
      {
        model: User,
        as: 'user'
      }
    ],
    subQuery: true
  })

  if (!meme) {
    throw createError.NotFound()
  }

  res.send({ meme: memeMapper(meme, 'user') })

  res.send()
}
async function getRandomMeme({ user }, res) {
  const memes = await Meme.findOne({
    where: { '$memeUserStats.userId$': { [Op.or]: [{ [Op.ne]: user.id }, { [Op.is]: null }] } },
    include: [
      {
        model: MemeUserStat,
        required: false
      },
      'user',
      'file',
      'tags'
    ],
    order: sequelize.random(),
    subQuery: false
  })
  res.send(memes)
}
async function setMemeStat({ user, body: { watchTime, rate }, params: { id } }, res) {
  const userRate = [-1, 0, 1].includes(rate) ? rate : 0
  const memeUserStat = MemeUserStat.create(
    {
      memeId: id,
      userId: user.id,
      watchTime: watchTime ?? 0,
      rate: userRate
    },
    {
      updateOnDuplicate: ['watchTime', 'rate']
    }
  )
  res.send(memeUserStat)
}
async function updateMeme() {}
async function removeMeme() {}

export default {
  createMeme,
  getAllMemes,
  getMeme,
  getRandomMeme,
  setMemeStat,
  updateMeme,
  removeMeme
}
