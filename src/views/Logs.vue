<template>
  <div v-if="!isLoading">
    <h1>Logs</h1>

    <table class="table">
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
      stats: {},
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
    this.$store.commit('setIsLoading', true);
    fetch(`${process.env.VUE_APP_ENDPOINT}/logs`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    })
      .then((response) => {
        //if (response.ok && response.status == 200)
        return response.json();
      })
      .then((data) => {
        this.$store.commit('setIsLoading', false);
        if (data.ok) {
          this.logs = data.data;
          for (const log of this.logs) {
            const notificationIdentifier = log.notification._id + ' // ' + log.notification.title;
            if (this.stats[notificationIdentifier] == undefined) {
              this.$set(this.stats, notificationIdentifier, {
                total: 0,
                success: 0,
                fail: 0,
              });
            }

            this.stats[notificationIdentifier]['total']++;
            if (log.response.statusCode == 201)
              this.stats[notificationIdentifier]['success']++;
            else this.stats[notificationIdentifier]['fail']++;
          }
        } else {
          this.$store.commit('setMessage', {
            class: 'warning',
            message: data.message
          });
        }
      })
      .catch((error) => {
        this.$store.commit('setIsLoading', false);
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.logs {
  list-style: none;
  padding: 0;
  margin: 0;

  &__entry {
    padding: 0.3rem 0;

    span {
      font-weight: bold;
    }
  }
}
</style>
