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
    if (!this.$store.getters.isAuthenticated)
      this.$store.dispatch('checkAutoLogin');
  }
}
</script>

<style lang="scss">

</style>
