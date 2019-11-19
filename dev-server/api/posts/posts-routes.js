const express = require("express")
const postsController = require("./posts-controller")
const auth = require("../../services/auth-service")
const { check } = require('express-validator/check')

const router = express.Router()

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post("/posts", [
  auth.requireLogin,
  [
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ]
], postsController.index)

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/posts", auth.requireLogin, postsController.getAllPosts)

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/posts/:id", auth.requireLogin, postsController.getPostById)

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/posts/:id", auth.requireLogin, postsController.deletePost)

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/posts/like/:id", auth.requireLogin, postsController.likePost)

// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put("/posts/unlike/:id", auth.requireLogin, postsController.unlikePost)

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post("/posts/comment/:id", [
  auth.requireLogin,
  [
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ]
], postsController.commentPost)

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/posts/comment/:id/:comment_id", auth.requireLogin, postsController.deleteCommentPost)

module.exports = router