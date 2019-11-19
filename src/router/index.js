import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Error404 from "../views/404.vue"
import Login from "../views/authentication/Login.vue"
import Register from "../views/authentication/Register.vue"
import Dashboard from "../views/user/Dashboard.vue"
import Member from "../views/user/Member.vue"
import Messages from "../views/user/Messages.vue"
import Network from "../views/user/Network.vue"
import Profile from "../views/user/Profile.vue"
import User from "../views/user/User.vue"
import Post from "../views/post/Post.vue"
import Wall from "../views/post/Wall.vue"
import AdminLogin from "../views/admin/Login.vue"

// import * as auth from "../services/AuthService";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/profile/me",
    name: "profile",
    component: Profile
  },
  {
    path: "/profile/user/:id",
    name: "user",
    component: User
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/messages",
    name: "messages",
    component: Messages
  },
  {
    path: "/network",
    name: "network",
    component: Network
  },
  {
    path: "/members",
    name: "members",
    component: Member
  },
  {
    path: "/wall",
    name: "wall",
    component: Wall
  },
  {
    path: "/post",
    name: "post",
    component: Post
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: AdminLogin
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/404",
    name: "404",
    component: Error404
  },
  {
    path: "*",
    redirect: "/404"
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
