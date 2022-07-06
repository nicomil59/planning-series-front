<template>
    <div class="card text-center">
        <div class="card-header">
            {{ program.platform }}
        </div>
        <div class="card-body">
            <h4 class="card-title">{{ program.title }}</h4>
            <h5 class="card-title">{{ program.season }}</h5>
            <p class="card-text">{{ program.note }}</p>
        </div>
        <div class="card-footer text-muted">
            2 days ago
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProgramItem",
        props: {
            program: Object
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
    .card {
        border: 1px solid orange;
    }

    p {
        padding: 0 !important;
    }
</style>