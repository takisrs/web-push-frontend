<template>
  <div class="row">
    <div class="col-md-6">
      <form method="POST">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title..."
            v-model="title"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Message..."
            v-model="message"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Image..."
            v-model="image"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="icon" class="form-label">Icon</label>
          <input
            type="text"
            id="icon"
            name="icon"
            placeholder="Icon..."
            v-model="icon"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="badge" class="form-label">Badge</label>
          <input
            type="text"
            id="badge"
            name="badge"
            placeholder="Badge..."
            v-model="badge"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="vibrate" class="form-label">Vibrate</label>
          <input
            type="text"
            id="vibrate"
            name="vibrate"
            placeholder="Vibrate..."
            v-model="vibrate"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <input
            type="submit"
            class="btn btn-success"
            @click.prevent="createNotification()"
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
      title: '',
      message: '',
      image: '',
      icon: '',
      badge: '',
      vibrate: '100,20,100',
    };
  },
  methods: {
    createNotification() {
      if (
        this.validate([
          { field: 'title', value: this.title, rules: ['required'] },
          { field: 'message', value: this.message, rules: ['required'] },
          { field: 'image', value: this.image, rules: ['required', 'url'] },
          { field: 'icon', value: this.icon, rules: ['required', 'url'] },
          { field: 'badge', value: this.badge, rules: ['required', 'url'] },
          { field: 'vibrate', value: this.vibrate, rules: ['required'] },
        ])
      ) {
        this.$store.dispatch('createNotification', {
          title: this.title,
          message: this.message,
          image: this.image,
          icon: this.icon,
          badge: this.badge,
          vibrate: this.vibrate.split(','),
        });
      }
    },
  },
  mixins: [validationMixin],
};
</script>
