<template>
  <div id="navbar">
    <div class="navbar bg-dark">
      <h1>
        <router-link to="/">
          <div class="navbar-logo">
            <img src="../../src/assets/brand.png" alt="PYKEngine" /> Social
            Engine
          </div>
        </router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li v-if="!$store.state.isLoggedIn">
          <router-link to="/register">Register</router-link>
        </li>
        <li v-if="!$store.state.isLoggedIn">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="$store.state.isLoggedIn">
          <router-link to="/members">Members</router-link>
        </li>
        <li v-if="$store.state.isLoggedIn">
          <router-link to="/wall">Wall</router-link>
        </li>
        <li v-if="$store.state.isLoggedIn">
          <router-link to="/profile/me" class="nav-link">
            {{
            this.$store.state.name ? this.$store.state.name : "User"
            }}
          </router-link>
        </li>
        <li v-if="$store.state.isLoggedIn">
          <a v-on:click.prevent="logout()" class="nav-link" href>
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as auth from "../services/AuthService";

export default {
  data() {
    return {};
  },
  methods: {
    logout: function() {
      auth.logout();
      this.$router.push({ name: "home" });
    }
  }
};
</script>
