<template>
  <div class="dashboard">
    <modals-container />
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Dashboard</h1>
        <p class="lead">
          <i class="fas fa-user"></i>
          Welcome {{me.user.name}}
        </p>
        <div class="dash-buttons">
          <a v-on:click.prevent="editProfile()" class="btn btn-dark text-primary">
            <i class="fas fa-user-circle text-primary"></i> Edit Profile
          </a>
          <a v-on:click.prevent="editExperience()" class="btn btn-dark text-primary">
            <i class="fab fa-black-tie text-primary"></i> Add Experience
          </a>
          <a v-on:click.prevent="editEducation()" class="btn btn-dark text-primary">
            <i class="fas fa-graduation-cap text-primary"></i> Add Education
          </a>
        </div>
        <h2 class="my-2">Experience Credentials</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Company</th>
              <th class="hide-sm">Title</th>
              <th class="hide-sm">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exp in me.experience" :key="exp.id">
              <td>{{exp.company}}</td>
              <td class="hide-sm">{{exp.title}}</td>
              <td class="hide-sm">
                <div v-if="exp.current">
                  <p>{{exp.from}} - Current</p>
                </div>
                <div v-else>
                  <p>{{exp.from}} - {{exp.to}}</p>
                </div>
              </td>
              <td>
                <a v-on:click.prevent="deleteExp(exp._id)" class="btn btn-danger">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 class="my-2">Education Credentials</h2>
        <table class="table">
          <thead>
            <tr>
              <th>School</th>
              <th class="hide-sm">Degree</th>
              <th class="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="edu in me.education" :key="edu.id">
              <td>{{edu.school}}</td>
              <td class="hide-sm">{{edu.degree}}</td>
              <td class="hide-sm">
                <div v-if="edu.current">
                  <p>{{edu.from}} - Current</p>
                </div>
                <div v-else>
                  <p>{{edu.from}} - {{edu.to}}</p>
                </div>
              </td>
              <td>
                <a v-on:click.prevent="deleteEdu(edu._id)" class="btn btn-danger">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="my-2">
          <button class="btn btn-danger">
            <i class="fas fa-user-minus"></i>
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
// import EditProfile from "@/components/EditProfile.vue";
import * as userService from "../../services/UserService";

export default {
  name: "dashboard",
  components: {
    Navbar,
    Sidebar
  },
  data: () => {
    return {
      editId: null,
      edit: null,
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
  methods: {
    show() {},
    editProfile() {
      this.edit = "profile";
      this.show();
    },
    editExperience() {
      this.edit = "experience";
      this.show();
    },
    editEducation() {
      this.edit = "education";
      this.show();
    },
    deleteEdu: async function(id) {
      console.log(id);
      // await userService.deleteProfileEdu(id);
      // this.me.education.splice(id, 1);
    }
  }
};
</script>
