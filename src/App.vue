<template>
  <div id="app">
    <div class="container">
      <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark mt-3 mb-4">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">Navbar</router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" activeClass="active" aria-current="page" to="/" exact>Home</router-link>
              </li>
              <li class="nav-item" v-if="!auth">
                <router-link class="nav-link" activeClass="active" aria-current="page" to="/login">Login</router-link>
              </li>
              <li class="nav-item" v-if="!auth">
                <router-link class="nav-link" activeClass="active" aria-current="page" to="/signup">Signup</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
              <button v-if="auth" @click="logout" class="btn btn-danger">logout</button>
          </div>
        </div>
      </nav>
      <template v-for="(msg, index) in messages">
      <Alert :message="msg.message" :className="msg.class" :key="index"/>
      </template>
      <router-view/>
    </div>
</div>
</template>

<script>
import Alert from '@/components/Alert.vue';

export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    messages() {
      return this.$store.getters.messages;
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
    }
  },
  components: {
    Alert
  }
}
</script>

<style lang="scss">

</style>
