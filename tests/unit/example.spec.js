import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.text()).toMatch('RentalCars.com')
  })
})
