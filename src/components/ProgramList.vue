<template>
    <div class="container-list mt-3 mx-auto">
        <ul v-if="programs.length > 0" class="mx-auto">
            <li v-for="(program) in programs" :key="program._id" class="mb-3 mx-auto">
                <router-link :to="{name: 'program', params: { id: program._id }}"><ProgramItem v-bind:program="program" class="program-item" /></router-link>
            </li>
        </ul>

        <p v-else class="text-center text-danger fw-bold">Pas trouvé ! 😑</p>

    </div>
</template>

<script>
    import ProgramItem from '@/components/ProgramItem.vue';

    export default {
        name: "ProgramList",
        components: {
            ProgramItem
        },
        props: {
            programs: Array
        },
        data() {
            return {

            }
        },
        methods: {

        },
        beforeMount() {
            
        }
    }
</script>

<style scoped>
    ul,
    li,
    p {
        padding: 0 !important;
    }

    ul {
        list-style-type: none;
    }

    li {
        max-width: 900px;
        width: 95%;
    }

    @media screen and (max-width: 768px) {
        li {
            width: 100%;
        }
    }
</style>