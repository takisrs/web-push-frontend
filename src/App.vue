<template>
  <div id="app">
    <div class="container">
      <Nav/>
      <template v-for="(msg, index) in messages">
      <Alert :message="msg.message" :className="msg.class" :key="index"/>
      </template>
      <router-view/>
    </div>
</div>
</template>

<script>
import Alert from '@/components/Alert.vue';
import Nav from '@/components/Nav.vue';

export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    messages() {
      return this.$store.getters.messages;
    }
  },
  components: {
    Alert,
    Nav
  },
  created(){
    console.log('created', this.$store.getters.isAuthenticated);
    if (!this.$store.getters.isAuthenticated)
      this.$store.dispatch('checkAutoLogin');
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
  body{
    font-family:'Ubuntu';
  }
</style>
