<template>
    <div :class="'alert alert-'+className">{{ message }}</div>
</template>

<script>
export default {
    props: ['message', 'className']
}
</script>