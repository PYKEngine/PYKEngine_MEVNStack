<template>
  <div class="about">
    <Navbar />
    <section class="landing">
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">
            <span>PYKEngine</span> - Social Engine
          </h1>
          <p class="lead">
            <img class="img-about" src="../assets/img/MEVN.png" alt />
          </p>
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

<style>
.img-about {
  height: 150px;
  width: auto;
}
</style>
