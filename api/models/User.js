import mongoose from 'mongoose'
import { BaseModelClass } from 'basedev-core'
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
      ret.fullName = `${doc.firstName} ${doc.lastName}`
    }
  }
}

userSchema.query.byUser = function (userId) {
  return this.find({ userId })
}

class UserClass extends BaseModelClass {
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

userSchema.loadClass(UserClass);

export default mongoose.model('User', userSchema)