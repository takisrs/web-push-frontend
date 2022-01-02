<template>
  <div>
    <div class="card">
      <div class="card-header">User details</div>
      <div class="card-body">
        <div>User email: {{ userData.userEmail }}</div>
        <div class="my-2">Associated website: {{ userData.website }}</div>
        <div class="my-2">Total subscriptions: {{ totalSubscriptions }}</div>
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
          <pre><code>{{ scripts.main }}</code></pre>
        </div>
        <div>
          Service worker:
          <pre><code>{{ scripts.sw }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalSubscriptions: 0,
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
        .then((response) => {
          this.totalSubscriptions = response.data.totalItems;
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
    this.getSubscriptions();
  },
};
</script>
