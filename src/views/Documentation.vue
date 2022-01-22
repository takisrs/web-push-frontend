<template>
  <div class="documentation">
    <VueMarkdown :source="md" />
  </div>
</template>

<script>
import VueMarkdown from '@adapttive/vue-markdown';
import markdown from 'raw-loader!../assets/documentation.md';

export default {
  data() {
    return {
      md: markdown
    };
  },
  /*   created() {
    fetch('./documentation.html')
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        const elementRef = document.getElementsByTagName('main')[0];
        let shadow = elementRef.attachShadow({ mode: 'open' });
        shadow.innerHTML = html;
      });
  }, */
  components: {
    VueMarkdown
  }
};
</script>
