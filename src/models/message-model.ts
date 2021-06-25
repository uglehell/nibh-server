import { model, Schema } from 'mongoose'

export interface IMessage {
  author: string
  text: string
  createdAt: string
  _id: Schema.Types.ObjectId
}

const messageSchema = new Schema(
  {
    author: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
)

export default model('Message', messageSchema)
