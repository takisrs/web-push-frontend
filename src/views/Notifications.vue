<template>
  <div v-if="!isLoading">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Notifications</h1>
      <router-link
        to="/notification/create"
        class="btn btn-success"
        tag="button"
        >Create Notification</router-link
      >
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
          <td>
            <span v-if="notification.sentAt" v-date:time>{{
              notification.sentAt
            }}</span>
          </td>
          <td style="width: 130px">
            <router-link
              :to="'/notification/edit/' + notification._id"
              tag="button"
              class="btn btn-sm btn-primary"
              :disabled="
                notification.status != 'DRAFT' &&
                notification.status != 'PENDING'
              "
            >
              <Icon name="edit" />
            </router-link>
            <button
              class="btn btn-sm btn-info mx-1"
              @click.prevent="copyNotification(notification._id)"
            >
              <Icon name="copy" />
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click.prevent="deleteNotification(notification._id)"
              :disabled="notification.status === 'IN_PROGRESS'"
            >
              <Icon name="delete" />
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
import Icon from '../components/Icon.vue';
export default {
  data() {
    return {
      notifications: [],
      currentPage: this.$route.params.page || 1,
      totalPages: 1,
    };
  },
  components: {
    Icon,
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
      this.$store.dispatch('getNotifications', { page }).then((result) => {
        if (result) {
          this.notifications = result.data.notifications;
          this.totalPages = result.data.totalPages;
          this.currentPage = result.data.currentPage;
        }
      });
    },
    deleteNotification(id) {
      this.$store.dispatch('deleteNotification', { id }).then((result) => {
        this.$store.commit('setMessage', {
          class: 'success',
          message: result.message,
        });
        this.getNotifications(this.currentPage);
      });
    },
    copyNotification(id) {
      this.$store.dispatch('copyNotification', { id }).then((result) => {
        this.$store.commit('setMessage', {
          class: 'success',
          message: result.message,
        });
        this.getNotifications(this.currentPage);
      });
    },
  },
  created() {
    this.getNotifications(this.$route.params.page);
  },
};
</script>