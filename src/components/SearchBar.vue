<template>
    <div class="search-bar">
        <label for="search" class="visually-hidden">Search for programs</label>
        <i class="bi bi-search icon"></i>
        <input v-on:input="handleSearch" type="text" v-model="search" placeholder="Rechercher programme..." class="form-control form-control-lg" id="search" />
        <button v-show="search" @click="reset" type="reset">&times;</button>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        data() {
            return {
                search: ''
            }
        },
        methods: {
            handleSearch() {

                console.log("Terme recherche dans SearchBar", this.search);

                this.$emit('search', this.search);
                
            },
            reset() {
                this.search = '';
                this.$emit('search', this.search);
            }
        }
    }
</script>

<style scoped>
    .search-bar {
        max-width: 400px;
        position: relative;
    }

    .search-bar input {
        padding-left: 35px;
    }
    
    .search-bar button {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 5px;
        display: block;
        margin: auto;
        padding: 0;
        border: none;
        width: 20px;
        height: 20px;
        line-height: 18px;
        background-color: #eee;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        font-size: 20px;
    }

    .search-bar button:hover {
        background-color: #ddd;
    }

    .icon {
        position: absolute;
        display: flex;
        font-size: 16px;
        left: 10px;
        top: 16px;
        color: #aaa;
    }

</style>