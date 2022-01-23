<template>
  <div class="row" v-if="!isLoading">
    <div class="col-md-6">
      <form method="POST">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name..."
            v-model="name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email..."
            v-model="email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password..."
            v-model="password"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="website" class="form-label">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="Website..."
            v-model="website"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <input
            type="submit"
            class="btn btn-success"
            @click.prevent="signup()"
            value="Submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import validationMixin from '@/mixins/validation';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      website: ''
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
    signup() {
      if (
        this.validate([
          { field: 'name', value: this.name, rules: ['required'] },
          { field: 'email', value: this.email, rules: ['required', 'email'] },
          { field: 'password', value: this.password, rules: ['required'] },
          { field: 'website', value: this.website, rules: ['required'] }
        ])
      ) {
        this.$store.dispatch('signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          website: this.website
        });
      }
    }
  },
  mixins: [validationMixin]
};
</script>
