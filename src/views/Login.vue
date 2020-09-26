<template>
    <div class="row">
        <div class="col-md-6">
            <form method="POST">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <ValidationProvider name="email" rules="required|email" tag="div">
                        <div slot-scope="{ errors }">
                            <input type="text" v-model="email" class="form-control" placeholder="Email..." id="email" name="email">
                            <p class="errors">{{ errors[0] }}</p>
                        </div>
                    </ValidationProvider>
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
import { ValidationProvider } from 'vee-validate';

export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        validate(){
            if (this.email == '' || this.password == ''){
                this.$store.commit('setMessage', {
                    class:"danger", 
                    message:"The email field is required"
                });
                return false;
            }

            if (this.password == ''){
                this.$store.commit('setMessage', {
                    class:"danger", 
                    message:"The password field is required"
                });
                return false;
            }

            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(this.email).toLowerCase())){
                this.$store.commit('setMessage', {
                    class:"danger", 
                    message:"Invalid Email"
                });
                return false;
            }

            return true;
        },
        login(){
            if (this.validate()){
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                });
            }
            
        }
    },
    components: {
        ValidationProvider
    }
}
</script>

<style lang="scss">
    .errors{
        color:#ff0000;
        padding:0.4rem 0;
        font-size:0.8rem;
        font-weight:300;
        
        &:empty{
            padding:0;
        }
    }
</style>