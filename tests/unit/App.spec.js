import nock from 'nock'
import path from 'path'
import { shallowMount } from '@vue/test-utils'

import App from '@/App.vue'

describe('HelloWorld.vue', () => {
  beforeEach(() => {
    nock.disableNetConnect() // disables real-http requests
    nock('https://www.rentalcars.com')
      .get('/FTSAutocomplete.do')
      .query(true)
      .replyWithFile(200, path.join(__dirname, '../__fixtures__/autocomplete.json'), {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
  })

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.text()).toMatch('RentalCars.com')
  })

  describe('methods', () => {
    describe('performSearch', () => {
      it('key up calls perform search with value', () => {
        const wrapper = shallowMount(App)
        wrapper.vm.performSearch = jest.fn()
        wrapper.vm.query = 'manchester'
        wrapper.find('#pick-up-location').trigger('keyup')
        expect(wrapper.vm.performSearch).toHaveBeenCalled()
      })

      it('calls to an API and returns results matching the search term', async () => {
        const wrapper = shallowMount(App)
        wrapper.vm.query = 'manchester'
        await wrapper.vm.performSearch()
        expect(wrapper.vm.results.length).toEqual(6)
      })
    })
  })
})
