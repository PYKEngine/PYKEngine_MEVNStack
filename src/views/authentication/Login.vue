<template>
  <div id="login">
    <div class="login-wrapper">
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
              <label for="email" class="login-label">Email</label>
              <input v-model="email" type="text" class="login-input" />
            </div>
            <div>
              <label for="password" class="login-label">Password</label>
              <input v-model="password" type="password" class="login-input" />
            </div>
            <button type="submit" class="btn login-primary-btn">Sign In</button>
          </form>
          <div class="login-links">
            <a href="#">Forgot Password</a>
          </div>
          <div class="or">
            <hr class="bar" />
            <span>OR</span>
            <hr class="bar" />
          </div>
          <router-link to="/register" class="btn btn-secondary">Create an account</router-link>
        </div>
        <footer class="login-footer">
          <p>Copyright &copy; 2019, PYKEngine All Rights Reserved</p>
          <div>
            <router-link to="/terms">Terms</router-link>|
            <router-link to="/privacy">Privacy</router-link>
          </div>
        </footer>
      </div>
      <div class="login-right">
        <div class="login-showcase">
          <div class="login-showcase-content">
            <h1 class="login-showcase-text">Connect dev</h1>
            <router-link to="/about" class="btn btn-secondary">Learn more about PYKEngine</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as auth from "../../services/AuthService";

export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit: async function() {
      const user = {
        email: this.email,
        password: this.password
      };
      await auth.login(user);
      this.$router.push({ name: "wall" });
    }
  }
};
</script>