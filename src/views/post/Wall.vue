<template>
  <div name="wall">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">The wall</h1>
        <p class="lead">
          <i class="fas fa-user"></i> What's new on the network!
        </p>
        <div class="post-form">
          <div class="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <form class="form my-1">
            <textarea name="text" cols="30" rows="5" placeholder="Create a post" required></textarea>
            <input type="submit" class="btn btn-dark my-1" value="Submit" />
          </form>
        </div>
        <div class="posts">
          <div v-for="p in posts" :key="p.id" class="post bg-white p-1 my-1">
            <div>
              <router-link v-bind:to="`/profile/user/${p.user}`">
                <img class="round-img" :src="`https:${p.avatar}`" alt />
                <h4>{{p.name}}</h4>
              </router-link>
            </div>
            <div>
              <p class="my-1">{{p.text}}</p>
              <p class="post-date">Posted on {{p.createdAt}}</p>
              <button type="button" class="btn btn-light">
                <i class="fas fa-thumbs-up"></i>
                <span>{{p.likes.length}}</span>
              </button>
              <button type="button" class="btn btn-light">
                <i class="fas fa-thumbs-down"></i>
              </button>
              <a href="post.html" class="btn btn-primary">
                Discussion
                <span class="comment-count">{{p.comments.length}}</span>
              </a>
              <button type="button" class="btn btn-danger">
                <i class="fas fa-times"></i>
              </button>
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
import * as postService from "../../services/PostService";

export default {
  name: "wall",
  data: function() {
    return {
      posts: []
    };
  },
  components: {
    Navbar,
    Sidebar
  },
  beforeRouteEnter(to, from, next) {
    postService.getAllPosts().then(res => {
      next(vm => {
        vm.posts = res.data;
      });
    });
  },
  methods: {}
};
</script>
