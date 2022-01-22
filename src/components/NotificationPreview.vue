<template>
  <div v-if="title || message" class="notification-preview-container">
    <h2>Notification Preview</h2>
    <div class="notification-preview p-3 border">
      <img
        class="notification-preview__icon"
        v-if="icon"
        :src="icon"
        alt="icon"
      />
      <div class="notification-preview__title">{{ title }}</div>
      <div class="notification-preview__message">{{ message }}</div>

      <img
        class="notification-preview__image"
        v-if="image"
        :src="image"
        alt="image"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'message', 'image', 'icon']
};
</script>

<style lang="scss" scoped>
.notification-preview-container {
  width: 500px;
  float: right;
}
.notification-preview {
  &__title {
    color: rgb(83, 83, 83);
  }

  &__message {
    color: rgb(117, 117, 117);
  }

  &__icon {
    width: 3rem;
    height: 3rem;
    float: right;
  }

  &__image {
    max-height: 160px;
    display: block;
    margin-top: 1rem;
  }
}
</style>
