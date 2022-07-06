<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-white">
        <div class="container">
            <router-link to="/" class="navbar-brand">Planning Séries</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/" class="btn btn-outline-secondary">Lien A
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/" class="btn btn-outline-secondary">Lien B
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

    export default {
        name: "NavBarApp",
        
        methods: {
            
        },
        beforeMount() {

        }
    }
</script>

<style scoped>

.navbar {
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); */
    background-color: #f9f9f9 !important;
}
.navbar:hover {
    background-color: #fff !important;
}
    
</style>