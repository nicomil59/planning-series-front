<template>
    <div class="container mt-3">
        <h2 class="text-center">Liste des programmes</h2>
        <table class="table table-striped table-hover table-borderless align-middle fs-5">
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
                        <button @click="updateProg" v-bind:data-programid="program._id" type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal"
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
                    <h3 class="modal-title" id="modalUpdateLabel">Modification du programme</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="modifyProgram">
                        <div class="mb-3">
                            <label for="inputSchedule" class="form-label">Date</label>
                            <input v-model="updateSchedule" type="datetime-local" class="form-control" id="inputSchedule">
                        </div>
                        <div class="mb-3">
                            <label for="inputTitle" class="form-label">Titre</label>
                            <input v-model="updateTitle" type="text" class="form-control" id="inputTitle">
                        </div>
                        <div class="mb-3">
                            <label for="inputSeason" class="form-label">Saison</label>
                            <input v-model="updateSeason" type="text" class="form-control" id="inputSeason">
                        </div>
                        <div class="mb-3">
                            <label for="inputPlatform" class="form-label">Plateforme</label>
                            <input v-model="updatePlatform" type="text" class="form-control" id="inputPlatform">
                        </div>
                        <div class="mb-3">
                            <label for="inputCountries" class="form-label">Pays</label>
                            <input v-model="updateCountries" type="text" class="form-control" id="inputCountries">
                        </div>
                        <div class="mb-3">
                            <label for="inputNote" class="form-label">Note</label>
                            <textarea v-model="updateNote" type="text" class="form-control" id="inputNote"/>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Modifier</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                modalNote: '',
                updateSchedule: null,
                updateTitle: '',
                updateSeason: '',
                updatePlatform: '',
                updateCountries: [],
                updateNote: '',
                programId: null
            }
        },
        methods: {
            formatTime(time) {
                return moment(time).format('L')+ ' - ' + moment(time).format('LT')
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

                } catch (error) {
                    console.log(error.response.data);
                }
            },
            updateProg(e) {
                console.log('update prog');
                this.programList = this.$store.state.programs;
                const pgSelected = this.programList.filter(program => program._id == e.currentTarget.getAttribute('data-programid'))[0];
                console.log(pgSelected.schedule.substr(0, 10));
                console.log(pgSelected.schedule)
                const scheduleFromDB = pgSelected.schedule.slice(0, -1).slice(0,16);
                console.log(scheduleFromDB)

                // Heure dans BD en UTC -> ajout de 2h pour récupération bonne heure dans l'input

                let newDate = new Date(scheduleFromDB);
                console.log("newDate", newDate);
                newDate.setHours(newDate.getHours() + 2);
                console.log("newDate after setHours", newDate);

                const strNewDate = moment(newDate).format('L').split('/').reverse().join('-') + 'T' + moment(newDate).format('LT');

                console.log(strNewDate)

                this.updateSchedule = strNewDate;
                this.updateTitle = pgSelected.title;
                this.updateSeason = pgSelected.season;
                this.updatePlatform = pgSelected.platform;
                this.updateCountries = pgSelected.countries;
                this.updateNote = pgSelected.note;
                this.programId = pgSelected._id;
            },
            async modifyProgram() {
                console.log('nouvel horaire', this.updateSchedule);

                console.log('this.programId', this.programId)

                console.log(typeof this.updateCountries);

                const progId = this.programId;
                const token = this.$store.state.token;

                const updatedProgram = {
                    title: this.updateTitle,
                    season: this.updateSeason,
                    countries: typeof this.updateCountries === "string" ? this.updateCountries.split(',') : Object.values(this.updateCountries),
                    schedule: this.updateSchedule.split('T').join(' '),
                    platform: this.updatePlatform,
                    note: this.updateNote
                }

                console.log(updatedProgram);

                try {
                    const response = await Api.put(`programs/${progId}`, updatedProgram, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }});

                    console.log(response.data);


                    // const updatedData = response.data.updatedData;
                    // const updatedUser = Object.assign({...this.$store.state.user}, {...updatedData});

                    // mise à jour de user dans le state
                    // this.$store.dispatch('updatePrograms');

                    alert('modification effectuée !');

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