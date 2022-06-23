<template>
    <div class="container mt-3">
        <h2 class="text-center">Liste des programmes</h2>
        <table class="table table-striped table-hover table-borderless align-middle">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Saison</th>
                    <th scope="col">Plateforme</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(program) in programs" :key="program._id">
                    <th scope="row">{{ formatTime(program.schedule) }}</th>
                    <td>{{ program.title }}</td>
                    <td>{{ program.season }}</td>
                    <td>{{ program.platform }}</td>
                    <td>
                        <button @click="setProgramSelected" v-bind:data-programid="program._id" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                            data-bs-target="#modalView">
                            <i class="bi bi-eye d-flex align-items-center"></i>
                            <!-- Voir -->
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal"
                            data-bs-target="#modalUpdate">
                            <i class="bi bi-pencil d-flex align-items-center"></i>
                            <!-- Modifier -->
                        </button>
                    </td>
                    <td>
                        <button @click="deleteProg" v-bind:data-programid="program._id" type="button" class="btn btn-danger btn-sm">
                            <i class="bi bi-trash d-flex align-items-center"></i>
                            <!-- Supprimer -->
                        </button>
                    </td>
                </tr>
            </tbody>
            
        </table>

        <!-- Modal View -->
        <div class="modal fade" id="modalView" tabindex="-1" aria-labelledby="modalViewLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalViewLabel">Programme</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex  gap-4">
                        <div class="body-left fw-bold me-10 d-flex flex-column align-items-end">
                            <p>DATE</p>
                            <p>TITRE</p>
                            <p>SAISON</p>
                            <p>PLATEFORME</p>
                            <p>PAYS</p>
                            <p>NOTE</p>
                        </div>
                        <div class="body-right">
                            <p class="fw-bold text-danger">{{ formatTime(modalSchedule) }}</p>
                            <p class="fw-bold text-primary">{{ modalTitle }}</p>
                            <p>{{ modalSeason }}</p>
                            <p>{{ modalPlatform }}</p>
                            <div class="countries-list">
                                <span v-for="country in modalCountries" :key="country">{{ country }}</span>
                            </div>
                            <p>{{ modalNote }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Update -->
        <div class="modal fade" id="modalUpdate" tabindex="-1" aria-labelledby="modalUpdateLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalUpdateLabel">Modification du programme</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import moment from 'moment';
    moment.locale('fr');
    import Api from '../services/Api';

    export default {
        name: "ProgramListDash",
        props: {
            programs: Array
        },
        data() {
            return {
                programList: null,
                modalSchedule: null,
                modalTitle: '',
                modalSeason: '',
                modalPlatform: '',
                modalCountries: [],
                modalNote: ''
            }
        },
        methods: {
            formatTime(time) {
                return moment(time).format('L')
            },
            setProgramSelected(e) {
                this.programList = this.$store.state.programs;
                console.log('this.programList', this.programList);
                // console.log(e.target.dataset.programid)
                console.log(e.currentTarget.getAttribute('data-programid'))
                const pgSelected = this.programList.filter(program => program._id == e.currentTarget.getAttribute('data-programid'))[0];
                console.log('pgSelected', pgSelected);

                this.modalSchedule = pgSelected.schedule;
                this.modalTitle = pgSelected.title;
                this.modalSeason = pgSelected.season;
                this.modalPlatform = pgSelected.platform;
                this.modalCountries = pgSelected.countries;
                this.modalNote = pgSelected.note;
                
            },
            async deleteProg(e) {
                const progId = e.target.dataset.programid;
                console.log(progId);
                const token = this.$store.state.token;

                let okToDelete = confirm('Supprimer le programme ?')
                if(!okToDelete) {
                    return
                }

                try {
                    await Api.delete(`programs/${progId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }}
                    );

                    this.$store.dispatch('deleteProgram', progId);

                    alert('Programme supprimé !')

                    // redirection vers la page d'inscription
                    // this.$router.push('/signup');

                } catch (error) {
                    console.log(error.response.data);
                }
            }
        }
    }
</script>

<style scoped>
    ul,
    li,
    p {
        padding: 0 !important;
        margin: 0 !important;
    }

    ul {
        list-style-type: none;
    }

    .countries-list span:not(:last-child)::after {
        content: " - ";
    }

</style>