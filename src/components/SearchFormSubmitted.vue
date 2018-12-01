<template lang="html">
  <div class="searchFormSubmitted">
    <h2 class="searchFormSubmitted__title">
      Thank you
    </h2>
    <p>Your car from {{ data.name }} is on its way</p>
    <button
      class="btn"
      type="button"
      @click="onClick"
    >
      Order another car
    </button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          name: 'Somewhere'
        }
      }
    }
  },
  methods: {
    onClick () {
      this.$parent.$emit('initial')
    }
  }
}
</script>

<style lang="css">
.searchFormSubmitted {
  color: var(--color-black);
  background-color: var(--color-yellow);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.searchFormSubmitted__title {
  margin: 0;
}
</style>
