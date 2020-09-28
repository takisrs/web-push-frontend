<template>
    <div role="alert" :class="'alert alert-dismissible fade show alert-'+className">
        {{ message }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>    
    </div>
</template>

<script>
export default {
    props: ['message', 'className']
}
</script>