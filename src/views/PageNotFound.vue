<template>
  <div>
    <NavBarApp />
    <div class="container-fluid pt-4">
      <div class="pnf mx-auto text-center">
        
        <img src="../assets/error-404.png" class="pnf-img img-fluid" alt="logo erreur page non trouvée">
        <h1 class="pnf-title">Oups ! Page non trouvée</h1>
        <p class="pnf-text mt-4">La page que vous recherchez n'existe pas ou plus.</p>
        <p class="mt-4">Revenez en arrière ou accédez à <router-link to="/">la page d'accueil</router-link>.</p>

      </div>
    </div>
    <FooterCompo class="mx-auto mt-5" />
  </div>

</template>

<script>
  import NavBarApp from '@/components/NavBarApp.vue';
  import FooterCompo from '@/components/FooterCompo.vue';

  export default {
    name: 'PageNotFound',
    components: {
      NavBarApp,
      FooterCompo
    },
    data() {
      return {
        
      };
    },
    methods: {
      
    },
    async beforeMount() {

    }
  }
</script>

<style scoped>
  p {
    padding: 0 !important;
  }

  .pnf  {
    max-width: 1440px;
    width: 95%;
    margin-top: 130px;
  }

  .pnf-title {
    font-size: 2rem;
    font-weight: 700;
  }

  .pnf-text {
    font-size: 1.5rem;
  }

  .pnf-img {
    max-width: 150px;
  }

</style>