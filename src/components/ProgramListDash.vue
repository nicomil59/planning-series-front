<template>
    <div class="container mt-3">
        <h2 class="text-center">Liste des programmes</h2>
        <table class="table table-striped table-hover table-borderless">
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
                <tr v-for="(program) in programs" :key="program.id">
                    <th scope="row">{{ formatTime(program.schedule) }}</th>
                    <td>{{ program.title }}</td>
                    <td>{{ program.season }}</td>
                    <td>{{ program.platform }}</td>
                    <td>Voir</td>
                    <td>Modifier</td>
                    <td>Supprimer</td>
                </tr>
            </tbody>
            <!-- <li v-for="(program) in programs" :key="program.id" class="mb-5">
                <p>{{ formatTime(program.schedule) }} {{ program.title }} {{ program.season }} {{ program.platform }}
                </p>
            </li> -->
        </table>
    </div>
</template>

<script>
    import moment from 'moment';
    moment.locale('fr');

    export default {
        name: "ProgramListDash",
        props: {
            programs: Array
        },
        methods: {
            formatTime(time) {
                return moment(time).format('L')
            },
        },
        beforeMount() {
            console.log("Programmes dans ProgramListDash", this.$props.programs)
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
</style>