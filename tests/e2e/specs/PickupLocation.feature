Feature: Pick-up Location

  I want to see a input box to choose a pick-up Location

  Scenario: input box with styling
    Given I am a visitor to the rentalcars.com homepage
    Then I should see a Search Widget
    And a text box labelled 'Pick-up Location'
    And the styling as per the rentalcars.com homepage

  Scenario: placeholder text
    Given I am on the Search box within the rentalcars.com homepage
    Then I should see the placeholder text within the 'Pick Up Location' input box: 'city, airport, station, region and district...'
    And the styling is as per the rentalcars.com homepage

  Scenario: input focus state
    Given I am on the Search box within the rentalcars.com homepage
    When I click into 'Pick Up Location' box
    Then a focus state is applied

  Scenario: screen reader support
    Given I am on the Search box within the rentalcars.com homepage
    When I use a screen reader
    Then the correct criteria is read out for the 'Pick-up Location' box
