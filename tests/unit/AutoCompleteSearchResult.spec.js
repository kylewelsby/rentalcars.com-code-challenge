import nock from 'nock'
import path from 'path'
import { shallowMount } from '@vue/test-utils'

import '@/directives/click-outside'
import App from '@/components/AutoCompleteInput.vue'

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

  describe('methods', () => {
    describe('performSearch', () => {
      it('key up calls perform search with value', () => {
        const wrapper = shallowMount(App, {
          propsData: {
            label: 'Hello World'
          }
        })
        wrapper.vm.performSearch = jest.fn()
        wrapper.vm.value = 'manchester'
        wrapper.find('.AutoCompleteInput__input').trigger('input')
        expect(wrapper.vm.performSearch).toHaveBeenCalled()
      })

      it('calls to an API and returns results matching the search term', async () => {
        const wrapper = shallowMount(App, {
          propsData: {
            label: 'Hello World'
          }
        })
        wrapper.vm.query = 'manchester'
        await wrapper.vm.performSearch('manchester')
        expect(wrapper.vm.results.length).toEqual(6)
      })
    })
  })
})
