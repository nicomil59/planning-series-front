<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-white">
        <div class="container">
            <router-link to="/" class="navbar-brand">Home</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li v-if="loggedIn" class="nav-item">
                        <button @click="logOut" class="btn btn-outline-dark btn-logout" href="#">Se déconnecter</button>
                    </li>
                    <li v-else class="nav-item">
                        <router-link to="/login" class="btn btn-outline-secondary btn-login" href="#">Se connecter
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';

    export default {
        name: "NavBar",
        computed: {
            ...mapGetters(['loggedIn'])
        },
        methods: {
            logOut() {
                localStorage.removeItem('token');
                this.$store.dispatch('setLogout');

                alert('Vous êtes déconnecté(e) !');
                this.$router.push('/login');
            }
        },
        beforeMount() {
            this.$store.dispatch('checkToken');
        }
    }
</script>

<style scoped>
    .btn-logout,
    .btn-login {
        /* background-color: #FD5835;
        border-color: #FD5835; */
        /* color: #fff !important; */
        padding: 8px 12px !important;
        border-radius: 24px;
        border-width: 2px;
    }
</style>