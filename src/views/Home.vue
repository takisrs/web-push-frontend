<template>
  <div>
    <h1>Web Push Notifications</h1>
    <ul class="list-group">
      <li class="list-group-item">
        <span class="badge bg-secondary">Associated website</span>
        {{ userData.website }}
      </li>
      <li class="list-group-item">
        <span class="badge bg-secondary">User email</span>
        {{ userData.userEmail }}
      </li>
      <li class="list-group-item">
        <span class="badge bg-secondary">Total subscriptions</span>
        {{ totalSubscriptions }}
      </li>
      <li class="list-group-item">
        <span class="badge bg-secondary">User id</span>
        {{ userData.userId }}
      </li>
      <li class="list-group-item">
        <span class="badge bg-secondary">Vapid public key</span>
        {{ userData.vapidPublicKey }}
      </li>
      <li class="list-group-item">
        <span class="badge bg-secondary">Main script:</span>
        <pre><code>{{ scripts.main }}</code></pre>
      </li>
      <li class="list-group-item">
        <span class="badge bg-secondary">Service worker script:</span>
        <pre><code>{{ scripts.sw }}</code></pre>
      </li>
    </ul>
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
      this.$store.dispatch('getSubscriptions').then((response) => {
        this.totalSubscriptions = response.data.totalItems;
      });
    },
    getScript(type) {
      this.$store.dispatch('getScript', { type: type }).then((data) => {
        this.scripts[type] = data.data;
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
