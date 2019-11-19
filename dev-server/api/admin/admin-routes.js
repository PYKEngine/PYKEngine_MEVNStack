const express = require("express")
const adminController = require("./admin-controller")
const auth = require("../../services/admin-service")
const { check } = require('express-validator/check')

const router = express.Router()

// @route   Get api/admin/auth
// @desc    Get user by id
// @acces   Private
router.get("/admin/auth", auth.requireLogin, adminController.index)

// @route   POST api/admin/register
// @desc    Register user
// @acces   Public
router.post("/admin/register", [
  auth.requireLogin,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ]
], adminController.registerAdmin)

// @route   POST api/admin/auth
// @desc    LogIn
// @acces   Public
router.post("/admin/auth", [
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password'
  ).exists()
], adminController.loginAdmin)

// @route   Get api/profile
// @desc    Get all profiles
// @acces   Public
router.get("/admin/profile", adminController.getAllProfiles)

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/admin/profile/:user_id", adminController.getProfileById)

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/admin/profile/:user_id", auth.requireLogin, adminController.deleteById)

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/posts", auth.requireLogin, adminController.getAllPosts)

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/posts/:id", auth.requireLogin, adminController.getPostById)

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/posts/:id", auth.requireLogin, adminController.deletePost)

module.exports = router