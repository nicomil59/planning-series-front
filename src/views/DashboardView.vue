<template>
    <div>
        <NavBar />
        <h1>Dashboard</h1>
        <h2 v-if="loggedIn" class="text-success">Connecté</h2>
        <h2 v-else class="text-danger">Pas connecté</h2>
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar.vue";
    import {
        mapGetters
    } from 'vuex';

    export default {
        name: "DashboardView",
        components: {
            NavBar
        },
        computed: {
            ...mapGetters(['loggedIn'])
        },
    }
</script>

<style lang="scss" scoped>

</style>