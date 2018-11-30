<template>
  <div id="app">
    <h1>RentalCars.com</h1>
    <form
      name="SearchResultForm"
      class="search-form"
    >
      <label for="pick-up-location">
        Pick-up Location
      </label>
      <input
        v-model="query"
        @keyup="performSearch"
        id="pick-up-location"
        name="pick-up-location"
        placeholder="city, airport, station, region and district..."
      >
    </form>
    <div
      class="searchResults"
      v-if="results.length"
    >
      <div
        class="searchResult__item"
        v-for="(result, index) in results"
        :key="index"
      >
        {{ result.name }} ({{ result.iata }})
        <small>{{ result.city }} {{ result.country }}</small>
      </div>
    </div>
    <div
      class="searchResults__error"
      v-if="noResults"
    >
      No results found
    </div>
  </div>
</template>
<style>
.search-form {
  background-color: #f3ce56;
}
</style>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      query: '',
      results: []
    }
  },
  watch: {
    query (value, previousValue) {

    }
  },
  computed: {
    noResults () {
      return this.results.length === 0 && this.query.length > 1
    }
  },
  methods: {
    async performSearch () {
      if (this.query.length <= 1) {
        this.results = []
        return
      }
      this.isBusy = true
      const resp = await axios({
        method: 'GET',
        url: 'https://www.rentalcars.com/FTSAutocomplete.do',
        params: {
          solrIndex: 'fts_en',
          solrRows: 6,
          solrTerm: this.query
        }
      })
      this.isBusy = false
      if (resp.status !== 200) {
        this.hasError = true
        return
      }
      if (resp.data.results.numFound > 0) {
        this.results = resp.data.results.docs
      } else {
        this.results = []
      }
    }
  }
}
</script>
