Feature: Pick-up Location Auto Complete

  I want to be suggested results that match my input

  Scenario: remove placeholder text
    Given I am a visitor on the Search Box within the rentalcars.com homepage
    When I enter a single alphanumeric character into the pick up location
    Then the placeholder text disappears
    And no search results list is displayed

  Scenario: display results after 2 characters are input
    Given I am a visitor on the Search Box within the rentalcars.com homepage
    When I enter 2 or more alphanumeric characters into the pick up location
    Then I see a list of search results

  Scenario: display up-to six results
    Given I am a visitor on the Search Box within the rentalcars.com homepage
    When I have entered a matched search term for pick up location on desktop
    Then the maximum number of search results displayed is 6

  Scenario: error message when no results found
    Given I am a visitor on the Search Box within the rentalcars.com homepage
    When I enter a search term in the pick up location that is not recognised
    Then I should see the message 'No results found'

  Scenario: not display results when input contains 1 character
    Given the search results list is displayed
    When I remove the search term leaving only 1 character
    Then the search results list no longer displayed
