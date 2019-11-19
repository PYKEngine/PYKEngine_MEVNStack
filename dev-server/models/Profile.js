const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: String,
  website: String,
  location: String,
  status: String,
  skills: [String],
  bio: String,
  githubusername: String,
  experience: [
    {
      title: String,
      company: String,
      location: String,
      from: Date,
      to: Date,
      current: Boolean,
      description: String
    }
  ],
  education: [
    {
      school: String,
      degree: String,
      fieldofstudy: String,
      from: Date,
      to: Date,
      current: Boolean,
      description: String
    }
  ],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String
  },
  network: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      state: {
        type: String,
        default: "pending"
      }
    }
  ]
});
ProfileSchema.set("timestamps", true);

module.exports = Profile = mongoose.model('profile', ProfileSchema);
