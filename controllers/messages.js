import { Message } from "../models/message.js"
import { Profile } from '../models/profile.js'

const index = async (req, res) => {
  try {
    const messages = await Message.find({})
      .populate('added_by')
      .sort({ createdAt: 'desc' })
    return res.status(200).json(messages)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const create = async (req, res) => {
  try {
    req.body.added_by = req.user.profile
    const message = await new Message(req.body)
    await message.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { messages: message } }
    )
    return res.status(201).json(message)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.messages.remove({ _id: req.params.id })
    await profile.save()
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json(err)
  }
}

function update(req, res) {
  Message.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(message => res.json(message))
  .catch(err => res.json(err))
}

const show = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('added_by')
      .populate('comments.commenter')
    return res.status(200).json(message)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  index,
  create,
  update,
  deleteMessage as delete,
  show
}