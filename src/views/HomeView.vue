<template>
  <div>
    <NavBarApp />
    <div class="container-fluid pt-4">
      <div class="home mx-auto">
        <h1 class="text-center">HOME</h1>
        <SearchBar @search="HandleFilter" class="mx-auto mt-4" />
        <ProgramList v-if="search" :programs="filteredList" class="pb-5" />
        <ProgramList v-else :programs="programs" class="pb-5" />
      </div>
    </div>
  </div>

</template>

<script>
  // import { mapGetters } from 'vuex';
  import Api from '../services/Api';
  import NavBarApp from '@/components/NavBarApp.vue';
  import ProgramList from '@/components/ProgramList.vue';
  import SearchBar from '@/components/SearchBar.vue';

  export default {
    name: 'HomeView',
    components: {
      NavBarApp,
      ProgramList,
      SearchBar
    },
    // computed: {
    //   ...mapGetters(['loggedIn'])
    // },
    data() {
      return {
        programs: [],
        filteredList: [],
        search: ''
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
      HandleFilter(searchTerm) {
        console.log('payload', searchTerm);

        const result = this.programs.filter(program => program.title.toLowerCase().includes(searchTerm.toLowerCase()));

        this.search = searchTerm;

        console.log(result);

        this.filteredList = result;
      }
    },
    async beforeMount() {
      this.getPrograms();
    }
  }
</script>

<style scoped>
  p {
    padding: 0 !important;
  }

  .home {
    max-width: 1440px;
    width: 95%;
    /* width: 750px; */
    /* background-color: #F9F9F9; */

  }

  @media screen and (max-width: 768px) {
    .home {
      width: 100%;
    }
  }
</style>