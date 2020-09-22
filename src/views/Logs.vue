<template>
    <div>
        <h1>Logs</h1>
        <ul class="logs">
            <li class="logs__entry" v-for="(log, index) in logs" :key="index">{{ log.added }} - {{ log.response.statusCode }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logs: []
        }
    },
    created() {
        console.log('created');
        fetch("http://localhost:3000/logs", {
            headers: {
                'Authorization': 'Bearer '+this.$store.state.token
            }
        }).then(response => {
            //if (response.ok && response.status == 200)
            return response.json();
        }).then(data => {
            if (data.ok) {
                this.logs = data.data;
                console.log(data.data);
            } else {
                console.log(data.message);
            }
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>

<style lang="scss" scoped>
.logs {
    list-style: none;
    padding: 0;
    margin: 0;

    &__entry{
        padding: 1rem 0;
    }
}
</style>