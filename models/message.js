import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  name: {type: String, required: true},
  comment: {type: String },
}, {
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

export {Message}