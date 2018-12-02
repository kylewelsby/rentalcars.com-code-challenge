import Vue from 'vue'
Vue.directive('click-outside', {
  priority: 700,
  bind (el, binding, vNode) {
    el.__vueClickOutside__ = event => {
      if (!el.contains(event.target)) {
        vNode.context[binding.expression](event)
        event.stopPropagation()
      }
    }
    document.body.addEventListener('click', el.__vueClickOutside__)
  },
  unbind (el) {
    document.body.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
})
