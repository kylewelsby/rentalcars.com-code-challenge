<template>
  <form
    name="SearchResultForm"
    class="searchForm"
    @submit.prevent="onSubmit"
  >
    <h2 class="searchForm__title">
      Let's find your ideal car
    </h2>
    <AutoCompleteInput
      label="Pick-up Location"
      placeholder="city, airport, station, region and district..."
      v-model="pickUpLocation"
    />
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

.btn--search {
  align-self: flex-end;
  width: 100%;
  max-width: 220px;
}

</style>
<script>
import AutoCompleteInput from '@/components/AutoCompleteInput'
export default {
  components: {
    AutoCompleteInput
  },
  data () {
    return {
      pickUpLocation: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.pickUpLocation) {
        this.$parent.$emit('submitted', this.pickUpLocation)
      }
    }
  }
}
</script>
