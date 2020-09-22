<template>
  <div>
    <button class="btn btn-primary" @click="getSubscriptions">Get Subscriptions</button>
    <button class="btn btn-success ml-2" @click="sendNotification">Send Notification</button>
  </div>
</template>

<script>
export default {
  methods: {
    getSubscriptions() {
      this.$store.dispatch('getSubscriptions');
    },
    sendNotification() {
      this.$store.dispatch('sendNotification');
    }
  }
}
</script>
