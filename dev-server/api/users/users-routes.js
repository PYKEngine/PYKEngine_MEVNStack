const express = require("express")
const usersController = require("./users-controller")
const auth = require("../../services/auth-service")
const { check } = require('express-validator/check')

const router = express.Router()

// @route   POST api/users
// @desc    Register user
// @acces   Public
router.post("/users", [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
], usersController.registerUser)

module.exports = router