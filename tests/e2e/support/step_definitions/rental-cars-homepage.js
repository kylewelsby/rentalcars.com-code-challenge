function stubServer () {
  cy.server({
    delay: 50,
    force404: true
  })
  cy.fixture('autocomplete.json').as('autocompleteJSON')
  cy.route({
    delay: 50,
    method: 'GET',
    url: 'https://www.rentalcars.com/FTSAutocomplete.do?*',
    response: '@autocompleteJSON'
  }).as('searchResult')
  cy.route({
    delay: 50,
    method: 'GET',
    url: 'https://www.rentalcars.com/FTSAutocomplete.do?*solrTerm====',
    response: { 'results': { 'isGooglePowered': false, 'docs': [{ 'name': 'No results found' }], 'numFound': 0 } }
  }).as('searchResultEmpty')
}

Given('I am a visitor to the rentalcars.com homepage', () => {
  stubServer()
  cy
    .visit('/')
})

Given('I am a visitor on the Search Box within the rentalcars.com homepage', () => {
  stubServer()
  cy
    .visit('/')
    .get('input[name="pick-up-location"]')
    .focus()
})

Given('I am on the Search box within the rentalcars.com homepage', () => {
  stubServer()
  cy
    .visit('/')
    .get('input[name="pick-up-location"]')
    .focus()
})

Given(`the search results list is displayed`, () => {
  stubServer()
  cy
    .visit('/')
    .get('input[name="pick-up-location"]')
    .type('manchester')
})

When(`I click into 'Pick Up Location' box`, (label) => {
  cy
    .get(`input[name="pick-up-location"]`)
    .click()
})

When(`I use a screen reader`, () => {
  /* NOTE: this is a full page A11y Support,
     but the API doesnt handle isolated support yet */
  // cy.injectAxe()
})

When(`I enter a single alphanumeric character into the pick up location`, () => {
  cy
    .get(`input[name="pick-up-location"]`)
    .type('m')
})

When(`I enter 2 or more alphanumeric characters into the pick up location`, () => {
  cy
    .get(`input[name="pick-up-location"]`)
    .type('man')
  cy.wait('@searchResult')
})

When(`I have entered a matched search term for pick up location on desktop`, () => {
  cy
    .get(`input[name="pick-up-location"]`)
    .type('manchester')
  cy.wait('@searchResult')
})

When(`I enter a search term in the pick up location that is not recognised`, () => {
  cy
    .get(`input[name="pick-up-location"]`)
    .type('===')
  cy.wait('@searchResultEmpty')
})

When(`I remove the search term leaving only 1 character`, () => {
  cy.get(`input[name="pick-up-location"]`).invoke('val').then(val => {
    const selector = cy.get(`input[name="pick-up-location"]`)
    for (let i = 1; i < val.length; i++) {
      selector.type('{backspace}')
    }
  })
})

Then('I should see a Search Widget', () => {
  cy
    .get('input[name="pick-up-location"]')
    .should('exist')
})

Then(`a text box labelled {string}`, (label) => {
  cy
    .contains('label', label)
    .should('exist')
})

Then('the styling as per the rentalcars.com homepage', () => {
  cy
    .get('form[name="SearchResultForm"]')
    .should('have.css', 'background-color')
    .and('eq', 'rgb(243, 206, 86)')
})

Then('the styling is as per the rentalcars.com homepage', () => {
  cy
    .get('form[name="SearchResultForm"]')
    .should('have.css', 'background-color')
    .and('eq', 'rgb(243, 206, 86)')
})

Then(`I should see the placeholder text within the {string} input box: {string}`, (label, placeholder) => {
  cy
    .get('input[name="pick-up-location"]')
    .should('have.attr', 'placeholder', placeholder)
})

Then(`a focus state is applied`, () => {
  cy
    .focused()
    .should('have.attr', 'name', 'pick-up-location')
})

Then(`a text box labelled 'Pick-up Location'`, () => {
  cy
    .get('label[for="pick-up-location"]')
    .should('have.text', 'Pick-up Location')
})

Then(`the correct criteria is read out for the 'Pick-up Location' box`, () => {
  cy
    .get('label[for="pick-up-location"]')
    .should('have.text', 'Pick-up Location')
})

Then(`the placeholder text disappears`, () => {
  cy
    .get('input[name="pick-up-location"]')
    .should('have.value', 'm')
})

Then(`no search results list is displayed`, () => {
  cy
    .get('.searchResults')
    .should('not.exist')
})

Then(`I see a list of search results`, () => {
  cy
    .get('.searchResults')
    .should('exist')
})

Then(`the maximum number of search results displayed is 6`, () => {
  cy
    .get('.searchResults').within(() => {
      cy
        .get('.searchResult__item')
        .should('have.length.of.at.most', 6)
    })
})

Then(`I should see the message 'No results found'`, () => {
  cy
    .get('.searchResults__error')
    .should('have.text', 'No results found')
})

Then(`the search results list no longer displayed`, () => {
  cy
    .get('.searchResults')
    .should('not.exist')
})
