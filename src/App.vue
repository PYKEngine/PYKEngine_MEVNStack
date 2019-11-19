<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  beforeCreate: function() {
    this.$store.dispatch("authenticate");
  }
};
</script>
