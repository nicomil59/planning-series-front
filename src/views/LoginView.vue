<template>
    <div class="container-lg login-container">
        <h1>Admin Login</h1>
        <form @submit.prevent="handleConnect">
            <div class="mb-3">
                <label for="email_input" class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" id="email_input" required>
            </div>
            <div class="mb-3">
                <label for="password_input" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="password_input" required>
            </div>
            <p v-if="error" class="text-danger">Error !</p>
            <button type="submit" class="btn btn-primary">Me connecter</button>
        </form>
    </div>
</template>

<script>
    import Api from '../services/Api';

    export default {
        name: 'LoginView',
        data() {
            return {
                email: '',
                password: '',
                error: false,
                errorMessage: ''
            }
        },
        methods: {
            async handleConnect() {
                const dataInput = {
                    email: this.email,
                    password: this.password
                }

                try {
                    const response = await Api.post('auth/login', dataInput);

                    console.log(response.data);

                    this.error = false;

                    this.$store.dispatch('setLogin');
                    this.$store.dispatch('setToken', response.data.token);
                    this.$router.push('/');

                } catch (error) {
                    console.log(error.response.data);
                    this.error = true;
                    // this.errorMessage = error.response.data.message;
                }

                // console.log(dataInput);

                // this.$store.dispatch('LOGIN',  {
                //     email: this.email,
                //     password: this.password
                // })
                // .then(success => {
                //     this.$router.push('/');
                // })
                // .catch(error => {
                //     this.error = true;
                // })

            },
        }
    }
</script>

<style scoped>
    .login-container {
        max-width: 500px;
    }
</style>