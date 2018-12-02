<template lang="html">
  <div
    :class="{ 'AutoCompleteInput--hasError': hasError }"
    class="AutoCompleteInput field__group field__group--autocomplete"
    v-click-outside="close"
  >
    <label
      :for="uniqueId"
      class="AutoCompleteInput__label"
    >
      {{ label }}
    </label>
    <input
      type="text"
      :name="uniqueId"
      :id="uniqueId"
      :value="value"
      :placeholder="placeholder"
      class="AutoCompleteInput__input"
      @focus="onFocus"
      @input="onInput"
      @keyup.arrow-up="onArrowUp"
      @keyup.arrow-down="onArrowDown"
      @keydown.enter.stop.prevent="onEnter"
    >
    <Spinner
      class="AutoCompleteInput__spinner"
      v-if="isBusy"
    />
    <div
      v-if="hasResults && isOpen"
      class="AutoCompleteInput__results"
    >
      <AutoCompleteSearchResult
        v-for="(result, index) in results"
        :key="index"
        :data="result"
        :is-highlighted="highlightedIndex === index"
        @choose="onChoose(result)"
      />
    </div>
    <div
      class="AutoCompleteInput__error"
      v-if="hasError"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Spinner from '@/components/Spinner'
import AutoCompleteSearchResult from '@/components/AutoCompleteSearchResult'

let uniqueCounter = 0
export default {
  components: {
    AutoCompleteSearchResult,
    Spinner
  },
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    request: {
      type: Function,
      default (value) {
        return {
          method: 'GET',
          url: 'https://www.rentalcars.com/FTSAutocomplete.do',
          params: {
            solrIndex: 'fts_en',
            solrRows: 6,
            solrTerm: value
          }
        }
      }
    },
    responseHandler: {
      type: Function,
      default (resp) {
        if (resp.data.results.numFound > 0) {
          return resp.data.results.docs
        } else {
          return []
        }
      }
    }
  },
  created () {
    uniqueCounter++
  },
  data () {
    return {
      hasHttpError: false,
      isBusy: false,
      isOpen: false,
      results: [],
      value: '',
      highlightedIndex: null
    }
  },
  computed: {
    /**
    * @name uniqueId
    * Create a unique ID that identify's this component only.
    * @return {string} `AutoCompleteInput_{Number}`
    * @public
    */
    uniqueId () {
      return `AutoCompleteInput_${uniqueCounter}`
    },

    /**
    * @name hasResults
    * computes if there are results available
    * @return {boolean}
    */
    hasResults () {
      return this.results.length > 0
    },

    /**
    * @name isNotMatchingQuery
    * computes if there is a query but no results are found
    * @return {boolean}
    */
    isNotMatchingQuery () {
      return this.value.length > 1 && !this.hasResults
    },

    /**
    * @name hasError
    */
    hasError () {
      if (this.isBusy) return false
      if (this.isNotMatchingQuery) return true
      if (this.hasHttpError) return true
      return false
    },
    /**
     * @name errorMessage
     * @return {string}
     */
    errorMessage () {
      if (this.isNotMatchingQuery) {
        return 'No results found'
      }
      if (this.hasHttpError) {
        return 'Sorry, an error happened while searching'
      }
      return ''
    }
  },

  methods: {
    onFocus () {
      if (this.hasResults) {
        this.isOpen = true
      }
    },
    onInput (event) {
      this.value = event.target.value
      this.performSearch(this.value)
    },
    onChoose (data) {
      this.close()
      if (data) {
        this.value = data.name
      }
      this.$emit('input', data)
    },
    onArrowUp () {
      if (this.highlightedIndex !== null && this.highlightedIndex > 0) {
        this.highlightedIndex = this.highlightedIndex - 1
      } else {
        this.highlightedIndex = 0
      }
      let result = this.results[this.highlightedIndex]
      if (result) {
        this.value = result.name
      }
    },
    onArrowDown () {
      if (this.highlightedIndex !== null && this.highlightedIndex >= 0 && this.highlightedIndex < this.results.length - 1) {
        this.highlightedIndex = this.highlightedIndex + 1
      } else {
        this.highlightedIndex = 0
      }
      let result = this.results[this.highlightedIndex]
      if (result) {
        this.value = result.name
      }
    },
    onEnter () {
      this.close()
      let result = this.results[this.highlightedIndex]
      if (result) {
        this.value = result.name
      }
      this.$emit('input', result)
    },
    close () {
      this.isOpen = false
    },
    async performSearch (value) {
      if (value.length <= 1) {
        this.highlightedIndex = null
        this.results = []
      } else {
        this.isBusy = true
        const resp = await axios(this.request(value))
        this.isBusy = false
        this.highlightedIndex = null
        this.isOpen = true
        if (resp.status !== 200) {
          this.hasHttpError = true
          this.results = []
          return value
        }
        this.results = this.responseHandler(resp)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.AutoCompleteInput {
  position: relative;
}

.AutoCompleteInput--hasError .AutoCompleteInput__input {
  color: var(--color-red);
}

.AutoCompleteInput__results {
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

.AutoCompleteInput__spinner {
  position: absolute;
  top: 2.5rem;
  right: 1rem;
}

.AutoCompleteInput__error {
  color: var(--color-red);
  position: absolute;
  top: 2.5rem;
  right: 1rem;
}
</style>
