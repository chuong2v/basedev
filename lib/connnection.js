import mongoose from 'mongoose'
import Promise from 'bluebird'
mongoose.Promise = Promise

mongoose.connect("mongodb://localhost/basedev")
export default mongoose