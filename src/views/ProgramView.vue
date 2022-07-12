<template>
    <div>
        <NavBarApp />
        <div class="card card-program">
            <div>{{ title }}</div>
            <div>{{ season }}</div>
            <div>{{ platform }}</div>
            <div>{{ formatTime(schedule) }}</div>
            <div class="card-countries"><span v-for="(country) in countries" :key="country"
                    class="card-text">{{ country }}</span></div>
            <div>{{ note }}</div>
            <!-- <div class="row g-0 card-wrapper">
                <div class="col-md-4 d-flex card-left">
                    <span class="card-day">{{ formatDay(program.schedule)}}</span>
                    <span class="card-date">{{ formatDate(program.schedule)}}</span>
                    <span class="card-hour">{{ formatHour(program.schedule)}}</span>
                </div>
                <div class="col-md-8 card-right">
                    <div class="card-body card-content">
                        <div class="card-content-main">
                            <h4 class="card-title card-program-title">{{ program.title }}</h4>
                            <h5 class="card-title card-program-season">{{ program.season }}</h5>
                        </div>
                        <div class="card-text card-platform"><span>{{ program.platform }}</span></div>
                        <div class="card-countries">
                            <span v-for="(country) in program.countries" :key="country"
                                class="card-text">{{ country }}</span>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    import NavBarApp from "@/components/NavBarApp.vue";
    import {
        mapGetters
    } from 'vuex';
    import moment from 'moment';
    moment.locale('fr');

    export default {
        name: "ProgramView",
        props: {
            program: Object
        },
        components: {
            NavBarApp,
        },
        data() {
            return {
                title: '',
                season: '',
                platform: '',
                schedule: null,
                countries: [],
                note: '',
                id: ''
            };
        },
        computed: {
            ...mapGetters(['loggedIn'])
        },
        methods: {
            getProgram() {
                console.log(this.$route.params.id)
                this.id = this.$route.params.id;

                console.log(this.$store.state.programs);

                const programs = this.$store.state.programs;
                const program = programs.filter(program => program._id === this.id)[0];

                localStorage.setItem("program", JSON.stringify(program));

                this.title = program.title;
                this.season = program.season;
                this.platform = program.platform;
                this.schedule = program.schedule;
                this.countries = program.countries;
                this.note = program.note;
            },
            formatTime(time) {
                return moment(time).format('dddd') + ' ' + moment(time).format('LL') + ' à ' + moment(time).format('LT')
            },
            formatDay(time) {
                return moment(time).format('ddd').slice(0, 3)
            },
            formatDate(time) {
                return moment(time).format('DD') + '/' + moment(time).format('MM')
            },
            formatHour(time) {
                return moment(time).format('LT')
            },
        },
        beforeMount() {
            

            console.log(localStorage.getItem('program'))

            if (!localStorage.getItem('program')) {
                console.log('Pas de programme dans le Storage')
                this.getProgram();
            } else {
                console.log('program from Storage', JSON.parse(localStorage.getItem('program')));
                const program = JSON.parse(localStorage.getItem('program'));
                this.title = program.title;
                this.season = program.season;
                this.platform = program.platform;
                this.schedule = program.schedule;
                this.countries = program.countries;
                this.note = program.note;
            }

        }
    }
</script>

<style scoped>
    .card-countries span:not(:first-child)::before {
        content: ' | ';
    }
</style>