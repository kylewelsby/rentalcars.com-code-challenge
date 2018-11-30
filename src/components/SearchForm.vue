<template>
  <form
    name="SearchResultForm"
    class="searchForm"
  >
    <h2 class="searchForm__title">
      Let's find your ideal car
    </h2>
    <div class="field__group">
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
      <div v-if="results.length">
        <AutoCompleteSearchResult
          v-for="(result, index) in results"
          :key="index"
          :data="result"
        />
      </div>
      <div
        class="searchResults__error"
        v-if="noResults"
      >
        No results found
      </div>
    </div>
    <span class="searchForm__spacer" />
    <button type="submit" class="btn btn--search">Search</button>
  </form>
</template>
<style>
.searchForm {
  background-color: var(--color-yellow);
  padding: 1.625rem;
  margin: 1rem;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.searchForm__spacer {
  flex-grow: 1;
}

.searchForm__title {
  margin-top: 0;
  font-size: 2rem;
  color: var(--color-black);
}

.btn--search {
  align-self: flex-end;
  width: 100%;
  max-width: 220px;
}
</style>
<script>
import axios from 'axios'
import AutoCompleteSearchResult from '@/components/AutoCompleteSearchResult'
export default {
  components: {
    AutoCompleteSearchResult
  },
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
