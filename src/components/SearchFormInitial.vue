<template>
  <form
    name="SearchResultForm"
    class="searchForm"
    @submit.prevent="onSubmit"
  >
    <h2 class="searchForm__title">
      Let's find your ideal car
    </h2>
    <div class="field__group field__group--locationSearch">
      <label for="pick-up-location">
        Pick-up Location
      </label>
      <input
        v-model="query"
        @keyup="performSearch"
        id="pick-up-location"
        name="pick-up-location"
        class="searchForm__locationInput"
        placeholder="city, airport, station, region and district..."
      >
      <Spinner
        class="searchForm__locationSpinner"
        v-if="isBusy"
      />
      <div
        v-if="results.length && isOpen"
        class="searchResults"
      >
        <AutoCompleteSearchResult
          v-for="(result, index) in results"
          :key="index"
          :data="result"
          @choose="onChoose(result)"
        />
      </div>
      <div
        class="searchResults__error"
        v-if="noResults && !isBusy"
      >
        No results found
      </div>
      <div
        class="searchResults__error"
        v-if="hasError"
      >
        Sorry, an error has occurred
      </div>
    </div>
    <span class="searchForm__spacer" />
    <button
      type="submit"
      class="btn btn--search"
    >
      Search
    </button>
  </form>
</template>
<style>
.searchForm {
  background-color: var(--color-yellow);
  padding: 1.625rem;
  margin: 1rem;
  min-height: 300px;
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

.field__group--locationSearch {
  position: relative;
}

.searchResults {
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid var(--color-gray);
  border-top: 0;
  border-bottom-left-radius: 0.1875rem;
  border-bottom-right-radius: 0.1875rem;
  overflow: hidden;
}

.searchForm__locationSpinner {
  position: absolute;
  top: 2.5rem;
  right: 1rem;
}

.btn--search {
  align-self: flex-end;
  width: 100%;
  max-width: 220px;
}

.searchResults__error {
  color: var(--color-orange);
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-top: 0;
}
</style>
<script>
import axios from 'axios'
import Spinner from '@/components/Spinner'
import AutoCompleteSearchResult from '@/components/AutoCompleteSearchResult'
export default {
  components: {
    Spinner,
    AutoCompleteSearchResult
  },
  data () {
    return {
      query: '',
      results: [],
      selected: null,
      isOpen: false,
      hasError: false,
      isBusy: false
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
        this.isOpen = true
        this.results = resp.data.results.docs
      } else {
        this.results = []
      }
    },
    onChoose (item) {
      this.isOpen = false
      this.selected = item
      this.query = item.name
    },
    onSubmit () {
      if (this.selected) {
        this.$parent.$emit('submitted', this.selected)
      }
    }
  }
}
</script>
