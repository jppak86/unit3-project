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

const update = async (req, res) => {
  console.log("HITTTTTTT")
  try {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {new: true})
  await message.save()
  return res.status(200).json(message)
  } catch (err) {
    return res.status(500).json(err)
  }
}


const show = async (req, res) => {
  console.log("HIT")
  try {
    const message = await Message.findById(req.params.id)
      .populate('added_by')
      .populate('comments.commenter')
    return res.status(200).json(message)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const createComment = async (req, res) => {
  try {
    req.body.commenter = req.user.profile
    const message = await Message.findById(req.params.id)
    message.comments.push(req.body)
    await message.save()
    const newComment = message.comments[message.comments.length - 1]
    return res.status(201).json(newComment)
  } catch (err) {
    res.status(500).json(err)
  }
}

// const editComment = async (req, res) => {
//   try {
//     const message = await Message.findById(req.params.id)
// console.log("MESSAGE: ", message)
// console.log("Call back commentId: ", req.params.commentId)
//     message.comments.findByIdAndUpdate(req.params.commentId, req.body, {new: true})


//     await message.save()
    
//     return res.status(200).json(message)

//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

const deleteComment = async(req, res)=> {
  try {
    const message = await Message.findById(req.params.id)
    message.comments.remove({_id: req.params.commentId})

    await message.save()
    return res.status(204).end()
  }catch(err){
    res.status(500).json(err)
  }
}

export {
  index,
  create,
  update,
  deleteMessage as delete,
  show,
  createComment,
  deleteComment,
  // editComment
  
}