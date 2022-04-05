import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: {
    type: String,
    required: true,
  },
  photo: {type: String},
  messages: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
