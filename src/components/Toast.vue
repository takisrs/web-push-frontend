<template>
  <div
    :class="
      'toast show align-items-center border-0 m-1 text-white bg-' + className
    "
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">{{ message }}</div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'className'],
};
</script>