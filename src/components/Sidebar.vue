<template>
  <div class="sidebar">
    <div class="sidebar-profile">
      <router-link to="/profile/me">
        <img
          class="sidebar-img"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
          alt
        />
        <h1 class="sidebar-username">{{ this.$store.state.name ? this.$store.state.name : "User" }}</h1>
      </router-link>
      <p class="sidebar-title">Developer at Microsoft</p>
      <p class="sidebar-location">Seattle, WA</p>
      <div class="sidebar-icons">
        <i class="fas fa-globe"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-linkedin-in"></i>
        <i class="fab fa-youtube"></i>
        <i class="fab fa-github"></i>
      </div>
      <ul class="sidebar-menu">
        <li class="sidebar-item">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/messages">Messages</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/network">Network</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as userService from "../services/UserService";

export default {
  name: "sidebar",
  data: function() {
    return {
      me: []
    };
  },
  components: {},
  beforeRouteEnter(to, from, next) {
    userService.getUserProfile().then(res => {
      next(vm => {
        vm.me = res.data;
      });
    });
  },
  methods: {}
};
</script>
