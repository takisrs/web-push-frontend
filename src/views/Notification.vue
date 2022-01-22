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
          <label for="url" class="form-label">Url</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="url..."
            v-model="url"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Image</label>
          <div class="d-flex">
            <input
              type="text"
              id="image"
              name="image"
              placeholder="Image..."
              v-model="image"
              class="form-control me-2"
            />
            <ImageUploader @image-upload="image = $event" />
          </div>
        </div>
        <div class="mb-3">
          <label for="icon" class="form-label">Icon</label>
          <div class="d-flex">
            <input
              type="text"
              id="icon"
              name="icon"
              placeholder="Icon..."
              v-model="icon"
              class="form-control me-2"
            />
            <ImageUploader @image-upload="icon = $event" />
          </div>
        </div>
        <div class="mb-3">
          <label for="badge" class="form-label">Badge</label>
          <div class="d-flex">
            <input
              type="text"
              id="badge"
              name="badge"
              placeholder="Badge..."
              v-model="badge"
              class="form-control me-2"
            />
            <ImageUploader @image-upload="badge = $event" />
          </div>
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
          <label for="status" class="form-label">Status</label>
          <select
            id="status"
            name="status"
            class="form-select"
            v-model="status"
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="scheduledAt" class="form-label">Scheduled for</label>
          <input
            type="datetime-local"
            id="scheduledAt"
            name="scheduledAt"
            placeholder="scheduled at..."
            v-model="scheduledAt"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <input
            type="submit"
            class="btn btn-success"
            @click.prevent="
              $route.params.id ? editNotification() : createNotification()
            "
            :value="$route.params.id ? 'Update' : 'Create'"
          />
        </div>
      </form>
    </div>
    <div class="col-sm-6">
      <NotificationPreview
        :title="title"
        :message="message"
        :image="image"
        :icon="icon"
      />
    </div>
  </div>
</template>

<script>
import validationMixin from '@/mixins/validation.js';
import NotificationPreview from '../components/NotificationPreview.vue';
import ImageUploader from '../components/ImageUploader.vue';

export default {
  data() {
    return {
      title: '',
      message: '',
      url: '',
      image: '',
      icon: '',
      badge: '',
      status: 'DRAFT',
      scheduledAt: '',
      vibrate: '100,20,100'
    };
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  methods: {
    createNotification() {
      if (
        this.validate([
          { field: 'title', value: this.title, rules: ['required'] },
          { field: 'message', value: this.message, rules: ['required'] },
          { field: 'url', value: this.url, rules: ['url'] },
          { field: 'image', value: this.image, rules: ['required', 'url'] },
          { field: 'icon', value: this.icon, rules: ['required', 'url'] },
          { field: 'badge', value: this.badge, rules: ['required', 'url'] },
          { field: 'vibrate', value: this.vibrate, rules: ['required'] }
        ])
      ) {
        this.$store
          .dispatch('createNotification', {
            title: this.title,
            message: this.message,
            url: this.url,
            image: this.image,
            icon: this.icon,
            badge: this.badge,
            status: this.status,
            vibrate: this.vibrate.split(','),
            scheduledAt: this.scheduledAt
          })
          .then((result) => {
            if (result.ok) {
              this.$store.commit('setMessage', {
                class: 'success',
                message: result.message
              });
              this.$router.push('/notifications');
            }
          });
      }
    },
    editNotification() {
      if (
        this.validate([
          { field: 'title', value: this.title, rules: ['required'] },
          { field: 'message', value: this.message, rules: ['required'] },
          { field: 'url', value: this.image, rules: ['url'] },
          { field: 'image', value: this.image, rules: ['required', 'url'] },
          { field: 'icon', value: this.icon, rules: ['required', 'url'] },
          { field: 'badge', value: this.badge, rules: ['required', 'url'] },
          { field: 'vibrate', value: this.vibrate, rules: ['required'] }
        ])
      ) {
        this.$store
          .dispatch('editNotification', {
            id: this.$route.params.id,
            title: this.title,
            message: this.message,
            url: this.url,
            image: this.image,
            icon: this.icon,
            badge: this.badge,
            status: this.status,
            vibrate: this.vibrate.split(','),
            scheduledAt: this.scheduledAt
          })
          .then((result) => {
            if (result.ok) {
              this.$store.commit('setMessage', {
                class: 'success',
                message: result.message
              });
              this.$router.push('/notifications');
            }
          });
      }
    }
  },
  mixins: [validationMixin],
  components: {
    NotificationPreview,
    ImageUploader
  },
  created() {
    if (this.$route.params.id) {
      this.$store
        .dispatch('getNotification', { id: this.$route.params.id })
        .then((response) => {
          if (response.ok) {
            const notification = response.data.notification;

            this.title = notification.title;
            this.message = notification.message;
            this.url = notification.data?.url;
            this.image = notification.image;
            this.icon = notification.icon;
            this.badge = notification.badge;
            this.status = notification.status;
            this.vibrate = notification.vibrate.join(',');
            this.scheduledAt = notification.scheduledAt.substr(0, 19);
          }
        });
    }
  }
};
</script>
