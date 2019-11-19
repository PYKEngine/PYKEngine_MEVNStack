const express = require("express")
const authController = require("./auth-controller")
const auth = require("../../services/auth-service")
const { check } = require('express-validator/check')

const router = express.Router()

// @route   Get api/auth
// @desc    Get user by id
// @acces   Private
router.get("/auth", auth.requireLogin, authController.index)

// @route   POST api/auth
// @desc    LogIn
// @acces   Public
router.post("/auth", [
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password'
  ).exists()
], authController.login)

module.exports = router