import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  cycle: Number,
  storage: String,
  memo: String,
  good: Number,
  moved: Number,
  cheer: Number,
  sad: Number,
  files: Array
}, {
  timestamps: {
    createdAt: 'createdAt',
    modifiedAt: 'modifiedAt'
  }
});

const Community = mongoose.model("Community", schema);

export default Community;
