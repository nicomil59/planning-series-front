<template>
  <div>
    <NavBarApp />
    <div class="container">
      <div class="home mx-auto">
        <h1 class="text-center">HOME</h1>
        <ProgramList v-bind:programs="programs" />
      </div>
    </div>
  </div>
  
</template>

<script>
  // import { mapGetters } from 'vuex';
  import Api from '../services/Api';
  import NavBarApp from '@/components/NavBarApp.vue';
  import ProgramList from '@/components/ProgramList.vue';

  export default {
    name: 'HomeView',
    components: {
      NavBarApp,
      ProgramList,
    },
    // computed: {
    //   ...mapGetters(['loggedIn'])
    // },
    data() {
      return {
        programs: []
      };
    },
    methods: {
      async getPrograms() {
        try {
          const response = await Api.get('programs');

          console.log("Resultats appel getPrograms", response.data);

          this.programs = response.data;

          this.programs.sort((a, b) => new Date(a.schedule) - new Date(b.schedule));

          this.$store.dispatch('setPrograms', response.data);

        } catch (error) {
          console.log(error);
        }
      },
    },
    async beforeMount() {
      this.getPrograms();
    }
  }
</script>

<style scoped>
  
  .container {
    border: 1px solid red;
  }
  
  p {
    padding: 0 !important;
  }  

  .home {
    max-width: 1440px;
    width: 80%;
    /* width: 750px; */
  }
</style>