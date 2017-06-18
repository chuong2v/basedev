import config from 'config'
import mongoose from 'mongoose'
import Promise from 'bluebird'
mongoose.Promise = Promise

const connectMongo = () => {
  let mongoConfig = config.get('mongo')
  const { host, database } = mongoConfig
  mongoose.connect(`mongodb://${host}/${database}`)
}

export default connectMongo