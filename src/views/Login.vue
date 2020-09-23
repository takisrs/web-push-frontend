<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="alert alert-danger" v-if="message">{{ message }}</div>
            <form method="POST" v-if="showForm">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" id="email" name="email" placeholder="Email..." v-model="email" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password..." v-model="password" class="form-control">
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-success" @click.prevent="login()" value="Submit"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            message: undefined,
            showForm: true
        }
    },
    methods: {
        login(){
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            });
        }
    }
}
</script>