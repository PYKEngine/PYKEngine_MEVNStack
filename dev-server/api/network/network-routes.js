const express = require("express")
const networkController = require("./network-controller")
const auth = require("../../services/auth-service")

const router = express.Router()

// @route    POST api/network
// @desc     network request
// @access   Private
router.post("/network/:user_id", auth.requireLogin, networkController.index)

// @route    DELETE api/network
// @desc     delete network request
// @access   Private
router.delete("/network/:user_id", auth.requireLogin, networkController.deleteNetworkRequest)

module.exports = router
