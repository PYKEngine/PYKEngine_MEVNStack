const mongoose = require('mongoose');

const MessagingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  to: String,
  mail: {
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
});
MessagingSchema.set("timestamps", true);

module.exports = Messaging = mongoose.model('messages', MessagingSchema);