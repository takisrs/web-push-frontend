<template>
  <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark mt-3 mb-4">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">WPN</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="auth">
            <router-link
              class="nav-link"
              activeClass="active"
              aria-current="page"
              to="/"
              exact
              >Home</router-link
            >
          </li>
          <li class="nav-item" v-if="auth">
            <router-link
              class="nav-link"
              activeClass="active"
              aria-current="page"
              to="/logs"
              >Logs</router-link
            >
          </li>
          <li class="nav-item" v-if="auth">
            <router-link
              class="nav-link"
              activeClass="active"
              aria-current="page"
              to="/notification"
              >Send Notification</router-link
            >
          </li>
        </ul>
        <div>
          <button v-if="auth" @click="logout" class="btn btn-danger">
            logout
          </button>
          <router-link
            v-if="!auth"
            class="btn btn-success mx-1"
            activeClass="active"
            aria-current="page"
            to="/login"
            >login</router-link
          >
          <router-link
            v-if="!auth"
            class="btn btn-primary"
            activeClass="active"
            aria-current="page"
            to="/signup"
            >signup</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>