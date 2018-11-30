<template>
  <div id="app">
    <h1>RentalCars.com</h1>
    <form name="SearchResultForm" class="search-form">
      <label for="pick-up-location">Pick-up Location</label>
      <input v-model="query" id="pick-up-location" name="pick-up-location" placeholder="city, airport, station, region and district...">
    </form>
    <div class="searchResults" v-if="results.length">
      <div class="searchResult__item" v-for="result in results">
        {{ result.name }}
      </div>
    </div>
    <div class="searchResults__error" v-if="noResults">No results found</div>
  </div>
</template>
<style>
.search-form {
  background-color: #f3ce56;
}
</style>
<script>
export default {
  data () {
    return {
      query: '',
      results: []
    }
  },
  watch: {
    query (value, previousValue) {
      if (value.length > 1 && value.startsWith('ma')) {
        this.results = [
          {
            name: 'Manchester Airport',
            type: 'Airport'
          },
          {
            name: 'a'
          },
          {
            name: 'b'
          },
          {
            name: 'c'
          },
          {
            name: 'd'
          },
          {
            name: '7'
          }
        ]
      } else {
        this.results = []
      }
    }
  },
  computed: {
    noResults () {
      return this.results.length === 0 && this.query.length > 1
    }
  }
}
</script>
