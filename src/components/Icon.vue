<template>
  <img :src="icon" :width="width" :height="height" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: function () {
        return 20;
      },
    },
    height: {
      type: Number,
      default: function () {
        return 20;
      },
    },
  },
  computed: {
    icon() {
      return require('../assets/icons/' + this.name + '.svg');
    },
  },
};
</script>
