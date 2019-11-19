<template>
  <div class="network">
    <modals-container />
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1>Network</h1>
        <div v-if="!me.network.length">None in your network yet</div>
        <div v-else>{{me.network}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import * as userService from "../../services/UserService";

export default {
  name: "network",
  components: {
    Navbar,
    Sidebar
  },
  data: function() {
    return {
      me: []
    };
  },
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
