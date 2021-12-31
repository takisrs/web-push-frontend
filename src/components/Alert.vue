<template>
    <div role="alert" :class="'alert alert-dismissible fade show alert-'+className">
        {{ message }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>   
    </div>
</template>

<script>
export default {
    props: ['message', 'className']
}
</script>