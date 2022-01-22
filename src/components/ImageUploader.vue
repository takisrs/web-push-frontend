<template>
  <picture-input
    ref="pictureInput"
    width="100"
    height="100"
    accept="image/jpeg,image/png"
    size="10"
    :showPreview="false"
    :hideChangeButton="true"
    button-class="btn btn-info"
    :custom-strings="{
      select: 'Upload',
      drag: 'Drag an image'
    }"
    @change="onChange"
  >
  </picture-input>
</template>

<script>
import PictureInput from 'vue-picture-input';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
    onChange(image) {
      if (image) {
        const formData = new FormData();
        formData.append('file', this.$refs.pictureInput.file);
        this.$store.dispatch('uploadImage', formData).then((result) => {
          if (result.ok) {
            this.$emit('image-upload', result.data.fullpath);
          }
        });
      }
    }
  },
  components: {
    PictureInput
  }
};
</script>

