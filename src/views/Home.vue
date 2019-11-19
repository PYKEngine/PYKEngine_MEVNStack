<template>
  <div class="home">
    <Navbar />
    <section class="landing">
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">
            <span>PYKEngine</span> - Social Engine
          </h1>
          <p class="lead">
            Developper Social Network | Create
            <span class="ampersand">&</span> Share your code
          </p>
          <div class="buttons">
            <router-link class="btn btn-secondary landing-btn" to="/register">Register</router-link>
            <router-link class="btn btn-primary landing-btn" to="/login">Login</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  components: {
    Navbar
  }
};
</script>