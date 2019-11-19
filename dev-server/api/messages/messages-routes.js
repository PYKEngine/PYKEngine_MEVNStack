const express = require("express")
const messagesController = require("./messages-controller")
const auth = require("../../services/auth-service")
const { check } = require('express-validator/check')

const router = express.Router()

// @route    Get api/messages
// @desc     get all messages for current user
// @access   Private
router.get("/messages", auth.requireLogin, messagesController.index)

// @route    POST api/messages
// @desc     send messages
// @access   Private
router.post("/messages/:user_id", [
  auth.requireLogin,
  [
    check('text', 'Message is required')
      .not()
      .isEmpty()
  ]
], messagesController.createMessage)

// @route    DELETE api/messages
// @desc     delete messages
// @access   Private
router.delete("/messages/:msg_id", auth.requireLogin, messagesController.deleteMessage)

module.exports = router