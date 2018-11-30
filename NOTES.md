# Notes

Here I shall share my notes and typed thinking while working through this project.

Looking at the [Challenge Spec](./CHALLENGE.pdf) I see the use of [Gherkin Scenarios](https://docs.cucumber.io/gherkin/reference/)

I wish to ensure I satisfy these scenarios exactly, so Beahaviour Driven Development [BDD] would be a great starting point.
I shall use E2E testing framework [Cypress.io](https://www.cypress.io/) with [Cucumber Plugin](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)


Step definitions for each will be defined in `./tests/e2e/support/step_definitions/rental-cars-homepage.js`.
I'll get the MVP working as simply as possible and then continue to improve upon the application code.


Now we have the e2e tests satisfied by using some very simple mocked logic.
We now have to wire the application up with an API.

We'll will use the simple but popular [`axios`](https://github.com/axios/axios) promised base HTTP client to make a request.

For unit tests, we'll use the [`nock`](https://github.com/nock/nock) HTTP server mocking library, this is to safely mock the requests and not rely on a real HTTP request which can be un-predictable for our tests. 
