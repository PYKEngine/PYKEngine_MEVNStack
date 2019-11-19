const User = require('../../models/Users')
const Messages = require('../../models/Messaging')
const { validationResult } = require('express-validator/check')


const index = async (req, res) => {
  try {
    const messages = await Messages.findOne({ user: req.user.id }).populate("user", ["name", "avatar"])
    if (!messages) {
      return res.status(400).json({ msg: 'There is no messages for this user' });
    }
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const createMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select('-password');

    const newMessage = new Messages({
      to: req.params.user_id,
      mail: {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }
    });
    const send = await newMessage.save();
    res.json(send);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const deleteMessage = async (req, res) => {
  try {
    const message = await Messages.findById(req.params.msg_id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    if (message.to.toString() === req.user.id) {
      await message.remove();
      res.json({ msg: 'Message removed' })
    }
    else if (message.mail.user.toString() === req.user.id) {
      await message.remove();
      res.json({ msg: 'Message removed' })
    } else {
      return res.status(401).json({ msg: 'User not authorized' })
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
}

module.exports = { index, createMessage, deleteMessage } 