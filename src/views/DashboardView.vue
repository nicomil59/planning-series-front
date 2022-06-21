<template>
    <div>
        <NavBar />
        <h1 class="text-center">Dashboard</h1>
        <p v-if="loggedIn" class="text-success text-center">Connecté</p>
        <p v-else class="text-danger text-center">Pas connecté</p>
        <ProgramListDash v-bind:programs="programs" />
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar.vue";
    import ProgramListDash from '@/components/ProgramListDash.vue';
    import {
        mapGetters
    } from 'vuex';
    import Api from '../services/Api';

    export default {
        name: "DashboardView",
        components: {
            NavBar,
            ProgramListDash
        },
        data() {
            return {
                programs: [],
            };
        },
        computed: {
            ...mapGetters(['loggedIn'])
        },
        methods: {
            async getPrograms() {
                try {
                    const response = await Api.get('programs');

                    console.log("Resultats appel getPrograms", response.data);

                    this.programs = response.data;

                    // this.$store.dispatch('setPosts', response.data);

                } catch (error) {
                    console.log(error);
                }
            }
        },
        async beforeMount() {
            this.getPrograms();
        }
    }
</script>

<style lang="scss" scoped>

</style>