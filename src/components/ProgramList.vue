<template>
    <div class="container-list mt-3">
        <h2 class="text-center my-4">ProgramList</h2>

        <ul v-if="programs.length > 0" class="mx-auto">
            <li v-for="(program) in programs" :key="program._id" class="mb-5">
                <ProgramItem v-bind:program="program" />
            </li>
        </ul>

        <p v-else class="text-center">Aucun programme !</p>

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

        }
    }
</script>

<style scoped>
    .container-list {
        border: 1px solid black;
    }

    ul,
    li,
    p {
        padding: 0 !important;
    }

    ul {
        list-style-type: none;
        max-width: 500px;
    }
</style>