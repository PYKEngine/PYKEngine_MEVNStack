const express = require("express")
const profileController = require("./profile-controller")
const auth = require("../../services/auth-service")
const { check } = require('express-validator/check')

const router = express.Router()

// @route   Get api/profile/me
// @desc    Get current user profile
// @acces   Private
router.get("/profile/me", auth.requireLogin, profileController.index)

// @route   Post api/profile
// @desc    Create or update user profile
// @acces   Private
router.post("/profile", [
  auth.requireLogin,
  [
    check('status', 'Status is required')
      .not()
      .isEmpty(),
    check('skills', 'Skills is required')
      .not()
      .isEmpty()
  ]
], profileController.editProfile)

// @route   Get api/profile
// @desc    Get all profiles
// @acces   Public
router.get("/profile", profileController.getAllProfiles)

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/profile/user/:user_id", profileController.getProfileById)

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/profile", auth.requireLogin, profileController.deleteById)

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put("/profile/experience", [
  auth.requireLogin,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('company', 'Company is required')
      .not()
      .isEmpty(),
    check('from', 'From date is required')
      .not()
      .isEmpty()
  ]
], profileController.editExperience)

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete("/profile/experience/:exp_id", auth.requireLogin, profileController.deleteExperience)

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put("/profile/education", [
  auth.requireLogin,
  [
    check('school', 'School is required')
      .not()
      .isEmpty(),
    check('degree', 'Degree is required')
      .not()
      .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
      .not()
      .isEmpty(),
    check('from', 'From date is required')
      .not()
      .isEmpty()
  ]
], profileController.editEducation)

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete("/profile/education/:edu_id", auth.requireLogin, profileController.deleteEducation)

// @route    DELETE api/profile/network/:net_id
// @desc     Delete network request
// @access   Private
router.delete("/profile/network/:net_id", auth.requireLogin, profileController.deleteNetworkRequest)

// @route    PUT api/profile/network/:net_id
// @desc     Accept network request
// @access   Private
router.put("/profile/network/:net_id", auth.requireLogin, profileController.acceptNetworkRequest)

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get("/profile/github/:username", profileController.getGitProfile)

module.exports = router