<template>
  <div class="row">
    <div class="col-md-6">
      <form method="POST">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            name="email"
            placeholder="Email..."
            v-model="email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Password..."
            v-model="password"
          />
        </div>
        <div class="mb-3">
          <input
            type="submit"
            class="btn btn-success"
            @click.prevent="login()"
            value="Submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import validationMixin from '@/mixins/validation.js';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (
        this.validate([
          { field: 'email', value: this.email, rules: ['required', 'email'] },
          { field: 'password', value: this.password, rules: ['required'] },
        ])
      ) {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
  mixins: [validationMixin],
};
</script>

<style lang="scss"></style>
