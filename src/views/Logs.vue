<template>
  <div>
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
  },
  created() {
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
        if (data.ok) {
          this.logs = data.data;
          for (const log of this.logs) {
            console.log(log);
            //this.stats.push(log.notification.title);
            if (this.stats[log.notification.title] == undefined) {
              this.$set(this.stats, log.notification.title, {
                total: 0,
                success: 0,
                fail: 0,
              });
            }

            this.stats[log.notification.title]['total']++;
            if (log.response.statusCode == 201)
              this.stats[log.notification.title]['success']++;
            else this.stats[log.notification.title]['fail']++;
          }
        } else {
          this.$store.commit('setMessage', {
            class: 'warning',
            message: data.message,
          });
        }
      })
      .catch((error) => {
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
