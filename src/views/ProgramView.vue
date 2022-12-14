<template>
    <div>
        <NavBarApp />

        <div v-if="isLoading" class="d-flex justify-content-center mb-4">
          <div  class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else class="container-fluid pt-4">
            <main class="mx-auto">
                <div class="card card-program text-center">
                    <div class="card-wrapper">
                        <div class="card-header">
                            <span class="card-schedule"><span class="card-date">{{ formatDate(schedule) }}</span> à
                                <span class="card-hour">{{ formatHour(schedule) }}</span></span>
                        </div>
                        <div class="card-body">
                            <h1 class="card-title card-program-title">{{ title }}</h1>
                            <p class="card-title card-program-season">{{ season }}</p>
                            <p class="card-text card-platform">{{ platform }}</p>
                            <div class="card-countries">
                                <span v-for="(country) in countries" :key="country"
                                    class="card-text card-country">{{ country }}</span>
                            </div>
                        </div>
                        <div v-if="note" class="card-footer">
                            <p class="card-text card-note">{{ note }}</p>
                        </div>
                    </div>
                </div>
                <button @click="goBack" type="button" class="btn btn-outline-secondary btn-goback my-3"><i
                        class="bi bi-arrow-left"></i></button>
            </main>
        </div>

        <FooterCompo class="mx-auto mt-3" />
    </div>
</template>

<script>
    import NavBarApp from "@/components/NavBarApp.vue";
    import FooterCompo from '@/components/FooterCompo.vue';
    import {
        mapGetters
    } from 'vuex';
    import moment from 'moment';
    moment.locale('fr');
    import Api from '../services/Api';

    export default {
        name: "ProgramView",
        props: {
            program: Object
        },
        components: {
            NavBarApp,
            FooterCompo
        },
        data() {
            return {
                title: '',
                season: '',
                platform: '',
                schedule: null,
                countries: [],
                note: '',
                id: '',
                isLoading: false
            };
        },
        computed: {
            ...mapGetters(['loggedIn'])
        },
        methods: {
            getProgram() {
                // console.log(this.$route.params.id)
                this.id = this.$route.params.id;

                // console.log(this.$store.state.programs);

                const programs = this.$store.state.programs;
                const program = programs.filter(program => program._id === this.id)[0];

                this.title = program.title;
                this.season = program.season;
                this.platform = program.platform;
                this.schedule = program.schedule;
                this.countries = program.countries;
                this.note = program.note;
            },
            async getProgramFromAPI() {
                this.id = this.$route.params.id;

                this.isLoading = true;

                try {
                    const response = await Api.get(`programs/${this.id}`);

                    // console.log('*********** APPEL API ***********');

                    // console.log("Resultat appel getProgram", response.data);

                    if (response.data) {
                        this.isLoading = false;
                    }

                    const programFromAPI = response.data;

                    this.title = programFromAPI.title;
                    this.season = programFromAPI.season;
                    this.platform = programFromAPI.platform;
                    this.schedule = programFromAPI.schedule;
                    this.countries = programFromAPI.countries;
                    this.note = programFromAPI.note;

                } catch (error) {
                    console.log(error);
                    console.log(error.message.includes('404'))
                    if(error.message.includes('404')) {
                        this.$router.push('/notFound');
                    }
                }


            },
            formatTime(time) {
                return moment(time).format('dddd') + ' ' + moment(time).format('LL') + ' à ' + moment(time).format('LT')
            },
            formatDay(time) {
                return moment(time).format('ddd').slice(0, 3)
            },
            formatDate(time) {
                return moment(time).format('dddd') + ' ' + moment(time).format('LL')
            },
            formatHour(time) {
                return moment(time).format('LT')
            },
            goBack() {
                this.$router.go(-1);
            }
        },
        beforeMount() {

            // console.log(this.$store.state.programs)

            if (!this.$store.state.programs) {

                // console.log('Appel API pour récupérer les infos sur le programme')

                this.getProgramFromAPI();

            } else {

                // console.log('Utilisation STATE pour récupérer les infos sur le programme')

                this.getProgram();
            }

        }
    }
</script>

<style scoped>
    p {
        padding: 0 !important;
    }

    main {
        max-width: 1440px;
        width: 95%;
    }

    .card-program {
        border-radius: 20px;
        border: 0;
    }

    .card-header {
        border: 0;
        background: #CAF0F8;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        font-size: 2rem;
    }

    .card-date,
    .card-hour {
        font-weight: 600;
        color: #03045E;
    }

    .card-program-title {
        font-size: 3.5rem;
        font-weight: 700;
        color: #03045E;
    }

    .card-program-season {
        font-size: 2rem;
        font-weight: 500;
        color: #696969;
    }

    .card-platform {
        font-size: 2.5rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        color: #0077B6;
    }

    .card-country {
        font-size: 1.75rem;
        color: #03045E;
    }

    .card-footer {
        border: 0;
        background: #e5f3f6;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .card-note {
        font-size: 1.5rem;
        color: #03045E;
        white-space: pre-wrap;
    }

    .card-countries span:not(:first-child)::before {
        content: ' | ';
    }

    .btn-goback {
        border-radius: 15px;
        border: 1px solid #0077b6;
        color: #0077b6;
        font-weight: 500;
    }

    .btn-goback:hover {
        border-radius: 15px;
        background-color: #0077b6;
        color: #fff;
    }

    .btn-goback i {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 576px) {

        .card-header {
            font-size: 1.5rem;
        }

        .card-program-title {
            font-size: 2.5rem;
        }

        .card-program-season {
            font-size: 1.5rem;
        }

        .card-platform {
            font-size: 2rem;
        }

        .card-country {
            font-size: 1.5rem;
        }

        .card-note {
            font-size: 1rem;
        }

    }
</style>