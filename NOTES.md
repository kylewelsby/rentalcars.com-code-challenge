# Notes

Here I shall share my notes and typed thinking while working through this project.

Looking at the [Challenge Spec](./CHALLENGE.pdf) I see the use of [Gherkin Scenarios](https://docs.cucumber.io/gherkin/reference/)

I wish to ensure I satisfy these scenarios exactly, so Beahaviour Driven Development [BDD] would be a great starting point.
I shall use E2E testing framework [Cypress.io](https://www.cypress.io/) with [Cucumber Plugin](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)

- commits `d83476d`

Step definitions for each will be defined in `./tests/e2e/support/step_definitions/rental-cars-homepage.js`.
I'll get the MVP working as simply as possible and then continue to improve upon the application code.

- commits `94a2702`

Now we have the e2e tests satisfied by using some very simple mocked logic.
We now have to wire the application up with an API.

We'll will use the simple but popular [`axios`](https://github.com/axios/axios) promised base HTTP client to make a request.

For unit tests, we'll use the [`nock`](https://github.com/nock/nock) HTTP server mocking library, this is to safely mock the requests and not rely on a real HTTP request which can be un-predictable for our tests.

Found that the Given API endpoint doesn't need to proxy through `https://cors.io` as the correct headers are provided.  So calling out to the naked endpoint should work correctly even across a different origin.
I hope 🤔,  but to fully test this, I'm going to use [localtunnel](https://localtunnel.github.io/www/) to generate an external URL.
After running `lt --port 8080` and navigating to the generated URL, I can confirm the API works fine with a different origin.  So this confirms the server is not limited to `SAME_ORIGIN` or a defined list of safe origins.

- commits `db7e352`

Now the application is speaking with the actual API, I can see results provide a `placeType` value.  I can see this can help with some visual aspects, so legs go ahead and break the `AutoCompleteSearchResult` into its own Component where we can add this isolated logic.

At this point, we're starting to style the components.  We'll add [`postcss-preset-env`](https://preset-env.cssdb.org/) which enables us to use upcoming CSS features Today. Also [`cssnano`](https://cssnano.co/) for good measure, cssnano will nicely reformat and compress our CSS on production & staging environments as configured in `postcss.config.js`.

We'll use the [BEM](http://getbem.com/) naming convention for naming our classes within our components.

The `AutoCompleteSearchResult` component makes [flexbox](https://caniuse.com/#feat=flexbox) which is suported from IE 10+.

We're also making use of [`rem`](https://www.w3.org/TR/css3-values/#font-relative-lengths) css units which are relative units to the computed `font-size` in the root element.
Why use `rem` over `px`? Simply explained; it allows best support of browser text size.

Simple `@supports` or modernizer.js checks could be put into place to patch support for older browsers, we'll add this graceful degratiation later.

- commits `0e479de`

Let's continue on with the styling.  We're going to format the `searchForm` to look like the site.

// TODO: Search result loader
// TODO: Make autocomplete overlay
// TODO: Keyboard arrow support for location selection.
