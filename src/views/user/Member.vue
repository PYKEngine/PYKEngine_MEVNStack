<template>
  <div class="members">
    <modals-container />
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1>Members</h1>
        {{users}}
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import * as userService from "../../services/UserService";

export default {
  name: "get-all-users",
  components: {
    Navbar,
    Sidebar
  },
  data: function() {
    return {
      users: []
    };
  },
  beforeRouteEnter(to, from, next) {
    userService.getAllUsers().then(res => {
      next(vm => {
        vm.users = res.data;
      });
    });
  },
  methods: {}
};
</script>
