<template>
  <div>
    <NavBarApp />
    <div class="container pt-4">
      <div class="mx-auto about">
        <h1 class="about-title">À propos de Planning Séries</h1>
        <p class="about-text mt-3">Planning Séries vous propose toutes les dates de sortie à venir de vos séries
          préférées (ou pas) sur toutes les plateformes de streaming (Netflix, Disney+, Prime Video, etc.) et les
          chaînes de télé françaises (TNT, câble, etc.).</p>
        <figure class="figure">
          <img src="../assets/oscar-nord-Sd87V72cJEU-unsplash.jpg" class="figure-img img-fluid about-img"
            alt="écran de télé avec des applications de streaming">
          <!-- <figcaption class="figure-caption">A caption for the above image.</figcaption> -->
        </figure>
        <div class="about-features">
          <h2 class="about-features-title mt-3">Fonctionnalités</h2>
          <div class="about-features-content">
            <div class="about-features-bloc">
              <h3 class="mt-3">Filtre par date</h3>
              <ul>
                <li>Sorties au cours du mois écoulé (J-30)</li>
                <li>Sorties dans les 7 jours à venir (J+7)</li>
                <li>Sorties dans les 30 jours à venir (J+30)</li>
              </ul>
            </div>
            <div class="about-features-bloc">
              <h3 class="mt-3">Filtre par plateforme</h3>
              <ul>
                <li>Netflix</li>
                <li>Prime Video</li>
                <li>Disney+</li>
                <li>Apple TV+</li>
                <li>Canal</li>
                <li>OCS</li>
                <li>Salto</li>
                <li>Autres : les autres plateformes et chaînes</li>
              </ul>
            </div>
          </div>
        </div>
        <button @click="goBack" type="button" class="btn btn-outline-secondary btn-goback my-3"><i
            class="bi bi-arrow-left"></i></button>

      </div>
    </div>
  </div>
</template>

<script>
  import NavBarApp from "@/components/NavBarApp.vue";
  export default {
    name: "AboutView",
    components: {
      NavBarApp,
    },
    data() {
      return {

      };
    },

    methods: {
      goBack() {
        this.$router.go(-1);
      }
    },
    beforeMount() {

    }
  }
</script>

<style scoped>
  h1,
  h2,
  h3 {
    color: #0077B6;
  }

  .about {
    max-width: 1440px;
    width: 95%;
    margin: 25px;
  }

  .about-text {
    max-width: 800px;
    line-height: 2;
  }

  figure {
    max-width: 800px;
  }

  .about-features {
    max-width: 800px;
    margin: 20px 0 20px;
  }

  .about-features-bloc {
    margin-left: 25px;
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

  /* .about-features-content {
    display: flex;
    justify-content: space-between;
  } */
</style>