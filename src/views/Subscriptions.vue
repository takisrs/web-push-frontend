<template>
  <div v-if="!isLoading">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Subscriptions</h1>
    </div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">endpoint</th>
          <th scope="col">Added at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subsription, index) in subscriptions" :key="index">
          <th scope="row">{{ subsription._id }}</th>
          <td>{{ subsription.endpoint }}</td>
          <td v-date:time>{{ subsription.added }}</td>
        </tr>
      </tbody>
    </table>
    <nav
      v-if="totalPages > 1"
      aria-label="Subscriptions navigation"
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
            :to="{ name: 'Subscriptions', params: { page: page } }"
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
      subscriptions: [],
      currentPage: this.$route.params.page || 1,
      totalPages: 1,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  watch: {
    '$route.params.page': function (page) {
      this.getSubscriptions(page);
    },
  },
  methods: {
    getSubscriptions(page) {
      this.$store.dispatch('getSubscriptions', { page }).then((result) => {
        if (result) {
          this.subscriptions = result.data.subscriptions;
          this.totalPages = result.data.totalPages;
          this.currentPage = result.data.currentPage;
        }
      });
    },
  },
  created() {
    this.getSubscriptions(this.$route.params.page);
  },
};
</script>