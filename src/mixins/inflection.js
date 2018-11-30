import Vue from 'vue'
import { titleize } from 'inflection'

Vue.mixin({
  filters: {
    titleize
  }
})
