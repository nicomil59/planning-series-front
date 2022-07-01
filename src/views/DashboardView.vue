<template>
    <div>
        <NavBar />
        <h1 class="text-center">Dashboard</h1>
        <p v-if="loggedIn" class="text-success text-center">Connecté</p>
        <p v-else class="text-danger text-center">Pas connecté</p>

        <label for="search" class="visually-hidden">Search for icons</label>
        <input v-if="loggedIn" v-on:input="filterList()" type="text" v-model="search" placeholder="Rechercher programme..." class="form-control mx-auto" id="search" />

        <ProgramListDash v-if="loggedIn" v-bind:programs="filteredList" />
        <p v-else class="text-center">Il faut être connecté pour accéder à la liste des programmes ! 😉</p>
        <p v-if="search && filteredList.length === 0" class="text-center text-danger fw-bold">Pas de résultat ! 😕</p>
        
        <div v-if="loggedIn" class="container d-flex justify-content-end mt-4">
            <button type="button" class="btn btn-outline-success btn-addprogram" data-bs-toggle="modal" data-bs-target="#modalAdd">Ajouter programme</button>
        </div>

        <!-- Modal Add -->
        <div class="modal fade" id="modalAdd" tabindex="-1" aria-labelledby="modalAddLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalAddLabel">Ajout d'un programme</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="createProgram">
                            <div class="mb-3">
                                <label for="inputSchedule" class="form-label">Date</label>
                                <input v-model="schedule" type="datetime-local" class="form-control" id="inputSchedule" required>
                            </div>
                            <div class="mb-3">
                                <label for="inputTitle" class="form-label">Titre</label>
                                <input v-model="title" type="text" class="form-control" id="inputTitle" required>
                            </div>
                            <div class="mb-3">
                                <label for="inputSeason" class="form-label">Saison</label>
                                <input v-model="season" type="text" class="form-control" id="inputSeason" required>
                            </div>
                            <div class="mb-3">
                                <label for="inputPlatform" class="form-label">Plateforme</label>
                                <input v-model="platform" type="text" class="form-control" id="inputPlatform" required>
                            </div>
                            <div class="mb-3">
                                <label for="inputCountries" class="form-label">Pays</label>
                                <input v-model="countries" type="text" class="form-control" id="inputCountries" required>
                            </div>
                            <div class="mb-3">
                                <label for="inputNote" class="form-label">Note</label>
                                <textarea v-model="note" type="text" class="form-control" id="inputNote"/>
                            </div>
                            
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="btn btn-primary">Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

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
                schedule: null,
                title: '',
                season: '',
                platform: '',
                countries: [],
                note: '',
                search: '',
                filteredList: []
            };
        },
        computed: {
            ...mapGetters(['loggedIn'])
        },
        methods: {
            async getPrograms() {
                try {
                    const response = await Api.get('programs');

                    // console.log("Resultats appel getPrograms", response.data);

                    this.programs = response.data;

                    this.programs.sort( (a, b) => new Date(a.schedule) - new Date(b.schedule) );

                    this.filteredList = this.programs;

                    this.$store.dispatch('setPrograms', response.data);

                } catch (error) {
                    console.log(error);
                }
            },
            async createProgram() {
                const newProgram = {
                    schedule: this.schedule.split('T').join(' '),
                    title: this.title,
                    season: this.season,
                    platform: this.platform,
                    countries: this.countries.split(','),
                    note: this.note
                };

                console.log('newProgram', newProgram)

                const token = this.$store.state.token;

                try {
                    const response = await Api.post('programs', newProgram, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }});

                    console.log(response.data);
                    alert('nouveau programme créé !');

                    this.schedule = null;
                    this.title = '';
                    this.season = '';
                    this.platform = '';
                    this.countries = [];
                    this.note = '';

                    try {
                        const response = await Api.get('programs');

                        console.log("récup programs après ajout program", response.data);

                        this.programs = response.data;

                        this.programs.sort( (a, b) => new Date(a.schedule) - new Date(b.schedule) );

                        this.$store.dispatch('setPrograms', response.data);

                    } catch (error) {
                        console.log(error.response.data);
                    }

                } catch (error) {
                    console.log(error.response.data);
                }

            },
            filterList() {
                
                console.log(this.search);
                
                const result = this.programs.filter(program => program.title.toLowerCase().includes(this.search.toLowerCase()));
                
                console.log(result);

                this.filteredList = result;
            }
        },
        async beforeMount() {
            this.getPrograms();
        }
    }
</script>

<style scoped>
    .btn-addprogram {
        border-radius: 24px;
        border-width: 2px;
    }

    #search {
        max-width: 300px;
    }
</style>