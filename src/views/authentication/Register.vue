<template>
  <div id="login">
    <div class="login-wrapper">
      <div class="login-right">
        <div class="login-showcase">
          <div class="login-showcase-content">
            <h1 class="login-showcase-text">Connect dev</h1>
            <router-link to="/about" class="btn btn-secondary">Learn more about PYKEngine</router-link>
          </div>
        </div>
      </div>
      <div class="login-left">
        <div class="login-signin">
          <router-link to="/">
            <div class="login-logo">
              <img src="../../../src/assets/brand.png" alt="PYKEngine" /> Social
              Engine
            </div>
          </router-link>
          <form class="login-form" v-on:submit.prevent="onSubmit">
            <div>
              <label for="username" class="login-label">Name</label>
              <input v-model="name" type="text" class="login-input" id="name" placeholder="Name" />
            </div>
            <div>
              <label for="email" class="login-label">Email</label>
              <input
                v-model="email"
                type="email"
                class="login-input"
                id="email"
                placeholder="Email"
              />
            </div>
            <div>
              <label for="job" class="login-label">Job</label>
              <input v-model="status" type="text" class="login-input" id="status" placeholder="Job" />
            </div>
            <div>
              <label for="skills" class="login-label">Skills</label>
              <input
                v-model="skills"
                type="text"
                class="login-input"
                id="skills"
                placeholder="Enter your skills separate by a coma"
              />
            </div>
            <div>
              <label for="password" class="login-label">Password</label>
              <input
                v-model="password"
                type="password"
                class="login-input"
                id="password"
                placeholder="Password"
              />
            </div>
            <button class="btn login-primary-btn">Register</button>
          </form>
          <div class="login-links">
            <a href="#">Forgot Password</a>
          </div>
          <div class="or">
            <hr class="bar" />
            <span>OR</span>
            <hr class="bar" />
          </div>
          <router-link to="/login" class="btn btn-secondary">Already have an account</router-link>
        </div>
        <footer class="login-footer">
          <p>Copyright &copy; 2019, PYKEngine All Rights Reserved</p>
          <div>
            <router-link to="/terms">Terms</router-link>|
            <router-link to="/privacy">Privacy</router-link>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import * as auth from "../../services/AuthService";

export default {
  name: "register",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      status: "",
      skills: []
    };
  },
  methods: {
    onSubmit: async function() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      const profile = {
        status: this.status,
        skills: this.skills
      };
      const registerPromise = await auth.registerUser(user);
      const loginPromise = await auth.login(user);
      await Promise.all([registerPromise, loginPromise]);
      await auth.generateUserprofile(profile);
      this.$router.push({ name: "profile" });
    }
  }
};
</script>
