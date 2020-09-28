<template>
  <div>
    <div class="card">
      <div class="card-header">
        User details
      </div>
      <div class="card-body">
        <div>User email: {{ userData.userEmail }}</div>
        <div>Associated website: {{ userData.website }}</div>
        <div>
          User id:
          <pre>{{ userData.userId }}</pre>
        </div>
        <div>
          Vapid public key:
          <pre>{{ userData.vapidPublicKey }}</pre>
        </div>
        <a href="#" class="btn btn-primary" @click="getSubscriptions">Get Subscriptions</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
  methods: {
    getSubscriptions() {
      this.$store.dispatch("getSubscriptions");
    },
  },
};
</script>
