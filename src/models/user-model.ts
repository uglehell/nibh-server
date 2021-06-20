import { model, Schema } from 'mongoose'

export interface IUser {
  username: string
  password: string
  _id: Schema.Types.ObjectId
}

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
})

export default model('User', userSchema)
