import mongoose from 'mongoose'
import Promise from 'bluebird'
mongoose.Promise = Promise
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String
  }
})

userSchema.options = {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      delete ret.__v
      delete ret.password
      return ret
    }
  }
}

userSchema.methods.verifyPassword = function (password) {

}

userSchema.query.byUser = function (userId) {
  return this.find({ userId })
}

export default mongoose.model('User', userSchema)