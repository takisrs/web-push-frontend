<template>
  <div>
    <div class="card">
      <div class="card-header">User details</div>
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
        <div>
          Main script:
          <pre>{{ scripts.main }}</pre>
        </div>
        <div>
          sw:
          <pre>{{ scripts.sw }}</pre>
        </div>
        <a href="#" class="btn btn-primary" @click="getSubscriptions"
          >Get Subscriptions</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scripts: {
        main: '',
        sw: '',
      },
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
  methods: {
    getSubscriptions() {
      this.$store
        .dispatch('getSubscriptions')
        .then((values) => {
          console.log(values);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getScript(type) {
      this.$store.dispatch('getScript', { type: type }).then((data) => {
        this.scripts[type] = data;
      });
    },
  },
  created() {
    this.getScript('main');
    this.getScript('sw');
  },
};
</script>
