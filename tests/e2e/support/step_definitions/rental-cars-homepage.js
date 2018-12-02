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
    .get(`input[name="AutoCompleteInput_1"]`)
    .focus()
})

Given('I am on the Search box within the rentalcars.com homepage', () => {
  stubServer()
  cy
    .visit('/')
    .get(`input[name="AutoCompleteInput_1"]`)
    .focus()
})

Given(`the search results list is displayed`, () => {
  stubServer()
  cy
    .visit('/')
    .get('input[name="AutoCompleteInput_1"]')
    .type('manchester')
})

When(`I click into 'Pick Up Location' box`, (label) => {
  cy
    .get(`input[name="AutoCompleteInput_1"]`)
    .click()
})

When(`I use a screen reader`, () => {
  /* NOTE: this is a full page A11y Support,
     but the API doesnt handle isolated support yet */
  // cy.injectAxe()
})

When(`I enter a single alphanumeric character into the pick up location`, () => {
  cy
    .get(`input[name="AutoCompleteInput_1"]`)
    .type('m')
})

When(`I enter 2 or more alphanumeric characters into the pick up location`, () => {
  cy
    .get(`input[name="AutoCompleteInput_1"]`)
    .type('man')
  cy.wait('@searchResult')
})

When(`I have entered a matched search term for pick up location on desktop`, () => {
  cy
    .get(`input[name="AutoCompleteInput_1"]`)
    .type('manchester')
  cy.wait('@searchResult')
})

When(`I enter a search term in the pick up location that is not recognised`, () => {
  cy
    .get(`input[name="AutoCompleteInput_1"]`)
    .type('===')
  cy.wait('@searchResultEmpty')
})

When(`I remove the search term leaving only 1 character`, () => {
  cy.get(`input[name="AutoCompleteInput_1"]`).invoke('val').then(val => {
    const selector = cy.get(`input[name="AutoCompleteInput_1"]`)
    for (let i = 1; i < val.length; i++) {
      selector.type('{backspace}')
    }
  })
})

Then('I should see a Search Widget', () => {
  cy
    .get(`input[name="AutoCompleteInput_1"]`)
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
    .get('input[name="AutoCompleteInput_1"]')
    .should('have.attr', 'placeholder', placeholder)
})

Then(`a focus state is applied`, () => {
  cy
    .focused()
    .should('have.attr', 'name', 'AutoCompleteInput_1')
})

Then(`a text box labelled 'Pick-up Location'`, () => {
  cy
    .get('label[for="AutoCompleteInput_1"]')
    .should('contain', 'Pick-up Location')
})

Then(`the correct criteria is read out for the 'Pick-up Location' box`, () => {
  cy
    .get('label[for="AutoCompleteInput_1"]')
    .should('contain', 'Pick-up Location')
})

Then(`the placeholder text disappears`, () => {
  cy
    .get(`input[name="AutoCompleteInput_1"]`)
    .should('have.value', 'm')
})

Then(`no search results list is displayed`, () => {
  cy
    .get('.AutoCompleteInput__results')
    .should('not.exist')
})

Then(`I see a list of search results`, () => {
  cy
    .get('.AutoCompleteInput__results')
    .should('exist')
})

Then(`the maximum number of search results displayed is 6`, () => {
  cy
    .get('.AutoCompleteInput__results').within(() => {
      cy
        .get('.place')
        .should('have.length.of.at.most', 6)
    })
})

Then(`I should see the message 'No results found'`, () => {
  cy
    .get('.AutoCompleteInput__error')
    .should('contain', 'No results found')
})

Then(`the search results list no longer displayed`, () => {
  cy
    .get('.AutoCompleteInput__results')
    .should('not.exist')
})
