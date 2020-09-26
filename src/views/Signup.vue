<template>
    <div class="row">
        <div class="col-md-6">
            <form method="POST">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="name" name="name" placeholder="Name..." v-model="name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" id="email" name="email" placeholder="Email..." v-model="email" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password..." v-model="password" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="website" class="form-label">Website</label>
                    <input type="text" id="website" name="website" placeholder="Website..." v-model="website" class="form-control">
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-success" @click.prevent="signup()" value="Submit"/>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            name: "",
            email: "",
            password: "",
            website: ""
        }
    },
    methods: {
        signup() {
            this.$store.dispatch('signup', {
                name: this.name,
                email: this.email,
                password: this.password,
                website: this.website
            });
        }
    }
}
</script>