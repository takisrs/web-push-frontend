<template>
  <div v-if="!isLoading">
    <h1>Logs</h1>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Notification</th>
          <th scope="col">Total</th>
          <th scope="col">Success</th>
          <th scope="col">Fail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stat, index) in stats" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{ stat.total }}</td>
          <td>{{ stat.success }}</td>
          <td>{{ stat.fail }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logs: [],
      stats: {}
    };
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  created() {
    this.$store.dispatch('getLogs').then((response) => {
      if (response.ok) {
        this.logs = response.data;
        for (const log of this.logs) {
          const notificationIdentifier =
            log.notification._id + ' // ' + log.notification.title;
          if (this.stats[notificationIdentifier] == undefined) {
            this.$set(this.stats, notificationIdentifier, {
              total: 0,
              success: 0,
              fail: 0
            });
          }

          this.stats[notificationIdentifier]['total']++;
          if (log.response.statusCode == 201)
            this.stats[notificationIdentifier]['success']++;
          else this.stats[notificationIdentifier]['fail']++;
        }
      }
    });
  }
};
</script>
