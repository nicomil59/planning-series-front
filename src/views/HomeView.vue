<template>
  <div>
    <NavBarApp />
    <div class="container-fluid pt-4">
      <div class="home mx-auto">
        <SearchBar @search="handleFilter" class="mx-auto mt-3" />

        <!-- Boutons de filtre -->
        <div class="btn-filters mt-4">
          <div class="btn-group">
            <button class="btn btn-lg dropdown-toggle btn-filter-date" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Filtrer par date
            </button>
            <ul class="dropdown-menu">
              <li><a @click="filterPreviously" class="dropdown-item" href="#">Previously (J-30)</a></li>
              <li><a @click="filterPlusSeven" class="dropdown-item" href="#">J+7</a></li>
              <li><a @click="filterPlusMonth" class="dropdown-item" href="#">J+30</a></li>
            </ul>
          </div>
          <div class="btn-group">
            <button class="btn btn-secondary btn-lg dropdown-toggle btn-filter-platform" type="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Filtrer par plateforme
            </button>
            <ul class="dropdown-menu">
              <li><a @click="filterByPlatform" class="dropdown-item" href="#">Netflix</a></li>
              <li><a @click="filterByPlatform" class="dropdown-item" href="#">Prime Video</a></li>
              <li><a @click="filterByPlatform" class="dropdown-item" href="#">Disney+</a></li>
              <li><a @click="filterByPlatform" class="dropdown-item" href="#">Apple TV+</a></li>
              <li><a @click="filterByPlatform" class="dropdown-item" href="#">Canal</a></li>
              <li><a @click="filterByPlatform" class="dropdown-item" href="#">OCS</a></li>
              <li><a @click="filterByPlatform" class="dropdown-item" href="#">Salto</a></li>
              <li><a @click="filterByPlatform" class="dropdown-item" href="#">Autres</a></li>
            </ul>
          </div>
          <button @click="resetFilter" type="button" class="btn btn-lg btn-reset">Reset</button>
        </div>

        <p v-if="filterName" class="text-center filter-name mt-4">Programmes {{ filterName }}</p>
        <p v-else class="text-center filter-name mt-4">Tous les programmes</p>

        <ProgramList v-if="search" :programs="filteredList" class="pb-5" />
        <ProgramList v-else :programs="programs" class="pb-5" />
      </div>
    </div>
    <FooterCompo class="mx-auto"/>
  </div>

</template>

<script>
  import Api from '../services/Api';
  import NavBarApp from '@/components/NavBarApp.vue';
  import ProgramList from '@/components/ProgramList.vue';
  import SearchBar from '@/components/SearchBar.vue';
  import FooterCompo from '@/components/FooterCompo.vue';
  import moment from 'moment';
  moment.locale('fr');

  export default {
    name: 'HomeView',
    components: {
      NavBarApp,
      ProgramList,
      SearchBar,
      FooterCompo
    },
    data() {
      return {
        allPrograms: [],
        programs: [],
        filteredList: [],
        search: '',
        filterName: ''
      };
    },
    methods: {
      async getPrograms() {
        try {
          const response = await Api.get('programs');

          // console.log('*********** APPEL API ***********');

          // console.log("Resultats appel getPrograms", response.data);

          const programsFromAPI = response.data;

          programsFromAPI.sort((a, b) => new Date(a.schedule) - new Date(b.schedule));

          this.allPrograms = programsFromAPI;

          this.$store.dispatch('setPrograms', programsFromAPI);

          this.programs = this.getProgramsFromToday(programsFromAPI);

          // console.log('Programmes à venir', this.programs);

        } catch (error) {
          console.log(error);
        }
      },
      getProgramsFromState() {

        this.allPrograms = this.$store.state.programs;
        
        this.programs = this.getProgramsFromToday(this.allPrograms);

      },
      handleFilter(searchTerm) {
        // console.log('payload', searchTerm);

        const result = this.programs.filter(program => program.title.toLowerCase().includes(searchTerm.toLowerCase()));

        this.search = searchTerm;

        // console.log(result);

        this.filteredList = result;
      },
      getProgramsFromToday(programs) {
        const result = programs.filter(program => moment(program.schedule).isAfter(moment().subtract(1, 'days')));

        return result;
      },
      filterPreviously() {
        // console.log('Previously !!')

        // réinitialise la liste des programmes
        this.programs = this.getProgramsFromToday(this.allPrograms);

        // filtre les programmes à J-30
        const result = this.allPrograms.filter(program => moment(program.schedule).isAfter(moment().subtract(30,
          'days')) && moment(program.schedule).isBefore(moment()));

        this.filterName = 'à J-30';

        this.programs = result;
      },
      filterPlusSeven() {
        // console.log('Plus Seven !!')

        // réinitialise la liste des programmes
        this.programs = this.getProgramsFromToday(this.allPrograms);

        // filtre les programmes à J+7
        const result = this.programs.filter(program => moment(program.schedule).isBefore(moment().add(7, 'days')));

        this.filterName = 'à J+7';

        this.programs = result;
      },
      filterPlusMonth() {
        // console.log('Plus Month !!')

        // réinitialise la liste des programmes
        this.programs = this.getProgramsFromToday(this.allPrograms);

        // filtre les programmes à J+30
        const result = this.programs.filter(program => moment(program.schedule).isBefore(moment().add(30, 'days')));

        this.filterName = 'à J+30';

        this.programs = result;
      },
      filterByPlatform(e) {
        // console.log('Filter by Platform !!')

        let result = "";

        // console.log(e.target.innerText)
        const platform = e.target.innerText.toLowerCase();

        // réinitialise la liste des programmes
        this.programs = this.getProgramsFromToday(this.allPrograms);

        // filtre les programmes selon la plateforme sélectionnée
        // console.log('Plateforme: ', platform);

        this.filterName = 'de ' + e.target.innerText;

        if (platform === 'canal') {
          result = this.programs.filter(program => program.platform.toLowerCase().includes('canal'));
        } else if (platform === 'ocs') {
          result = this.programs.filter(program => program.platform.toLowerCase().includes('ocs '));
        } else if (platform === 'autres') {
          result = this.programs.filter(program => !['netflix', 'prime video', 'disney+', 'apple tv+', 'salto']
            .includes(program
              .platform.toLowerCase()) && !program.platform.toLowerCase().includes('ocs ') && !program.platform
            .toLowerCase().includes('canal'));
          this.filterName = 'des autres plateformes';
        } else {
          result = this.programs.filter(program => program.platform.toLowerCase() === platform);
        }

        this.programs = result;
      },
      resetFilter() {
        this.filterName = '';
        this.programs = this.getProgramsFromToday(this.allPrograms);
      }
    },
    async beforeMount() {

      // console.log(this.$store.state.programs)

      if (!this.$store.state.programs) {

        // console.log('Appel API pour récupérer tous les programmes')

        this.getPrograms();

      } else {

        // console.log('Utilisation STATE pour récupérer tous les programmes')

        this.getProgramsFromState();
      }
      
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
  }

  .btn-filters {
    display: flex;
    justify-content: center;
    gap: 5px;
  }

  .btn-filters .dropdown-toggle {
    color: #fff !important;
    border-radius: 24px;
    border: 0;
  }

  .btn-filters .dropdown-toggle:hover {
    background-color: #03045E;
  }

  .btn-filter-date {
    background-color: #00B4D8;
  }

  .btn-filter-platform {
    background-color: #0096C7;
  }

  .btn-reset {
    background-color: #023E8A;
    color: #fff !important;
    border-radius: 24px;
    border: 0;
  }

  .btn-reset:hover {
    background-color: #03045E;
  }

  .dropdown-menu {
    width: 100%;
  }

  .dropdown-item {
    font-size: 20px;
  }

  .filter-name {
    font-weight: 500;
    font-size: 28px;
    color: #0077B6;
  }

  @media screen and (max-width: 768px) {
    .home {
      width: 100%;
    }
  }

  @media screen and (max-width: 576px) {
    .btn-filters {
      flex-direction: column;
      max-width: 400px;
      margin: 0 auto;
    }

    .filter-name {
      font-size: 22px;
    }
  }
</style>