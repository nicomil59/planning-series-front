<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-white">
        <div class="container">
            <router-link to="/" @click="goBack" class="navbar-brand navbar-logo">Planning Séries</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li v-if="isProgram" class="nav-item">
                        <button @click="goBack" class="btn btn-outline-secondary btn-goback">Retour</button>
                    </li>
                    <li v-else class="nav-item">
                        <router-link to="/about" class="btn btn-outline-secondary btn-about">À Propos</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "NavBarApp",
        data() {
            return {
                isProgram: false
            };
        },
        methods: {
            goBack() {
                localStorage.removeItem('program');
                this.$router.go(-1);
            }
        },
        beforeMount() {
            if (localStorage.getItem('program')) {
                this.isProgram = true;
                console.log("y a un prog")
            } else {
                console.log("y a pas de prog")
            }
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

    .navbar-logo {
        font-size: 1.5rem;
        font-weight: 600;
        color: #0096C7;
    }

    .navbar-logo:hover {
        color: #0077B6;
    }

    .btn-goback,
    .btn-about {
        border-radius: 24px;
        /* border: 0; */
        /* background-color: #0096C7; */
        color: #0077b6;
        border: 1px solid #0077b6;
    }

    .btn-goback:hover,
    .btn-about:hover {
        background-color: #0077b6;
        color: #fff;
    }

    @media screen and (max-width: 576px) {

        .navbar-nav {
            margin: 15px 0 10px;
            align-items: center;
        }

        .navbar-nav .nav-item {
            display: flex;
            justify-content: center;
        }


    }
</style>