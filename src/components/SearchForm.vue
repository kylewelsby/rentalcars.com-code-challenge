<template>
  <Transition
    :name="transition"
    mode="out-in"
  >
    <Component
      :is="view"
      :data="item"
    />
  </Transition>
</template>

<script>
import SearchFormInitial from './SearchFormInitial'
import SearchFormSubmitted from './SearchFormSubmitted'
export default {
  components: {
    SearchFormInitial,
    SearchFormSubmitted
  },
  data () {
    return {
      view: 'SearchFormInitial',
      transition: 'component-fade',
      item: null
    }
  },
  mounted () {
    this.$on('submitted', (item) => {
      this.item = item
      this.view = 'SearchFormSubmitted'
      this.transition = 'component-fade-reverse'
    })
    this.$on('initial', () => {
      this.item = null
      this.view = 'SearchFormInitial'
      this.transition = 'component-fade'
    })
  },
  beforeDestroy () {
    this.$off('submitted')
    this.$off('initial')
  }
}
</script>
