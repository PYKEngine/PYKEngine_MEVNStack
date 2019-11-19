<template>
  <div class="profile">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <div class="profile-grid my-1">
          <!-- About -->
          <div class="profile-about bg-light p-2">
            <h2 class="text-primary">My Bio</h2>
            <p>{{me.bio}}</p>
            <div class="line"></div>
            <h2 class="text-primary">My Skill Set</h2>
            <div class="skills">
              <div v-for="skill in me.skills" :key="skill.id" class="p-1">
                <i class="fas fa-check"></i>
                {{skill}}
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div class="profile-exp bg-white p-2">
            <h2 class="text-primary">My Experience</h2>
            <div v-for="exp in me.experience" :key="exp.id">
              <h3 class="text-dark">{{exp.company}}</h3>
              <div v-if="exp.current">
                <p>{{exp.from}} - Current</p>
              </div>
              <div v-else>
                <p>{{exp.from}} - {{exp.to}}</p>
              </div>
              <p>
                <strong>Position:</strong>
                {{exp.title}}
              </p>
              <p>
                <strong>Description:</strong>
                {{exp.description}}
              </p>
            </div>
          </div>

          <!-- Education -->
          <div class="profile-edu bg-white p-2">
            <h2 class="text-primary">My Education</h2>
            <div v-for="edu in me.education" :key="edu.id">
              <h3>{{edu.school}}</h3>
              <p>{{edu.from}} - {{edu.to}}</p>
              <p>
                <strong>Degree:</strong>
                {{edu.degree}}
              </p>
              <p>
                <strong>Field Of Study:</strong>
                {{edu.fieldofstudy}}
              </p>
              <p>
                <strong>Description:</strong>
                {{edu.description}}
              </p>
            </div>
          </div>

          <!-- Github -->
          <div class="profile-github">
            <h2 class="text-primary my-1">
              <i class="fab fa-github"></i> My Github Repos
            </h2>
            <div class="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href="#" target="_blank" rel="noopener noreferrer">Repo One</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, laborum!
                </p>
              </div>
              <div>
                <ul>
                  <li class="badge badge-primary">Stars: 44</li>
                  <li class="badge badge-dark">Watchers: 21</li>
                  <li class="badge badge-light">Forks: 25</li>
                </ul>
              </div>
            </div>
            <div class="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href="#" target="_blank" rel="noopener noreferrer">Repo Two</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, laborum!
                </p>
              </div>
              <div>
                <ul>
                  <li class="badge badge-primary">Stars: 44</li>
                  <li class="badge badge-dark">Watchers: 21</li>
                  <li class="badge badge-light">Forks: 25</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import * as userService from "../../services/UserService";

export default {
  name: "my-profile",
  data: function() {
    return {
      me: []
    };
  },
  components: {
    Navbar,
    Sidebar
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