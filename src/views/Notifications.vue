<template>
  <div v-if="!isLoading">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Notifications</h1>
      <router-link to="/notification/create" class="btn btn-success" tag="button">Create Notification</router-link>
    </div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Message</th>
          <th scope="col">Status</th>
          <th scope="col">Scheduled at</th>
          <th scope="col">Sent at</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(notification, index) in notifications" :key="index">
          <th scope="row">{{ notification._id }}</th>
          <td>{{ notification.title }}</td>
          <td>{{ notification.message }}</td>
          <td>{{ notification.status }}</td>
          <td v-date:time>{{ notification.scheduledAt }}</td>
          <td v-date:time>{{ notification.sentAt }}</td>
          <td>
            <button
              class="btn btn-sm btn-danger"
              @click.prevent="deleteNotification(notification._id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav
      v-if="totalPages > 1"
      aria-label="Notifications navigation"
      class="float-end"
    >
      <ul class="pagination">
        <li
          v-for="page in totalPages"
          :key="page"
          :class="currentPage == page ? 'page-item active' : 'page-item'"
        >
          <router-link
            class="page-link"
            :to="{ name: 'Notifications', params: { page: page } }"
            >{{ page }}</router-link
          >
        </li>
      </ul>
    </nav>
    <div class="clearfix">&nbsp;</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [],
      currentPage: this.$route.params.page || 1,
      totalPages: 1,
    };
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  watch: {
    '$route.params.page': function (page) {
      this.getNotifications(page);
    },
  },
  methods: {
    getNotifications(page) {
      this.$store.commit('setIsLoading', true);
      fetch(
        `${process.env.VUE_APP_ENDPOINT}/notifications?limit=10&page=${page}`,
        {
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          this.$store.commit('setIsLoading', false);
          if (result.ok) {
            this.notifications = result.data.notifications;
            this.totalPages = result.data.totalPages;
            this.currentPage = result.data.currentPage;
          } else {
            this.$store.commit('setMessage', {
              class: 'warning',
              message: result.message,
            });
          }
        })
        .catch((error) => {
          this.$store.commit('setIsLoading', false);
          console.log(error);
        });
    },
    deleteNotification(id) {
      fetch(`${process.env.VUE_APP_ENDPOINT}/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.ok) {
            this.$store.commit('setMessage', {
              class: 'success',
              message: result.message,
            });
            this.getNotifications(this.currentPage);
          } else {
            this.$store.commit('setMessage', {
              class: 'danger',
              message: result.message,
            });
          }
        })
        .catch(() => {
          this.$store.commit('setMessage', {
            class: 'danger',
            message: 'Error Occured',
          });
        });
    },
  },
  created() {
    this.getNotifications(this.$route.params.page);
  },
};
</script>