import mongoose from 'mongoose'



const Schema = mongoose.Schema

const commentSchema = new Schema({
  comment: {
      type: String,
      required: true
  },
  photo: {
      type: String,
      required: false
  },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  // We will embed the commentSchema here!!!
}, { timestamps: true })

const messageSchema = new Schema({
  message: {
    type: String,
    required: true
},
photo: {
    type: String,
    required: false
},
added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
comments: [commentSchema],
}, {
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

export {Message}