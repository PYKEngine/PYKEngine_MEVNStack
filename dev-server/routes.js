const authRoutes = require("./api/auth/auth-routes")
const adminRoutes = require("./api/admin/admin-routes")
const postsRoutes = require("./api/posts/posts-routes")
const profileRoutes = require("./api/profile/profile-routes")
const usersRoutes = require("./api/users/users-routes")
const networkRoutes = require("./api/network/network-routes")
const messagingRoutes = require("./api/messages/messages-routes")

const registerRoutes = (app) => {
  app.use("/api", authRoutes)
  app.use("/api", adminRoutes)
  app.use("/api", postsRoutes)
  app.use("/api", profileRoutes)
  app.use("/api", usersRoutes)
  app.use("/api", networkRoutes)
  app.use("/api", messagingRoutes)
}

module.exports = { registerRoutes }