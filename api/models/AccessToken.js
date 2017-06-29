import mongoose from 'mongoose'
const Schema = mongoose.Schema

const accessTokenSchema = new Schema({
  userId: {
    type: String,
    ref: 'user',
    required: true
  },
  token: {
    type: String,
    required: true
  }
})

accessTokenSchema.options = {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      delete ret.__v
    }
  }
}

accessTokenSchema.query.byUser = function (userId) {
  return this.find({ userId })
}

export default mongoose.model('AccessToken', accessTokenSchema)