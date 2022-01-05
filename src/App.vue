<template>
  <div id="app">
    <div class="container">
      <header class="header">
        <Nav />
      </header>

      <main class="wrapper" role="main">
        <Alert
          v-for="(msg, index) in alertMessages"
          :message="msg.message"
          :className="msg.class"
          :key="index"
        />
        <div class="toasts-container p-2 position-fixed top-0 end-0">
          <Toast
            v-for="(msg, index) in toastMessages"
            :message="msg.message"
            :className="msg.class"
            :key="index"
          />
        </div>
        <router-view />
      </main>

      <footer class="footer" role="contentinfo">
        Developed by&nbsp;
        <a target="_blank" rel="noopener" href="https://github.com/takisrs"
          >Panos Pantazopoulos</a
        >
      </footer>
    </div>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';
import Alert from '@/components/Alert.vue';
import Nav from '@/components/Nav.vue';

export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    toastMessages() {
      return this.$store.getters.messages.filter(
        (item) => item.type === 'toast'
      );
    },
    alertMessages() {
      return this.$store.getters.messages.filter(
        (item) => item.type === 'alert'
      );
    },
  },
  components: {
    Toast,
    Alert,
    Nav,
  },
  created() {
    if (!this.$store.getters.isAuthenticated)
      this.$store.dispatch('checkAutoLogin');
  },
};
</script>

<style lang="scss"></style>
