const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  text: String,
  name: String,
  avatar: String,
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      text: String,
      name: String,
      avatar: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});
PostSchema.set("timestamps", true);

module.exports = Post = mongoose.model('post', PostSchema);
