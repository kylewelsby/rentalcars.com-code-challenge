# Notes

Here I shall share my notes and typed thinking while working through this project.

Looking at the [Challenge Spec](./CHALLENGE.pdf) I see the use of [Gherkin Scenarios](https://docs.cucumber.io/gherkin/reference/)

I wish to ensure I satisfy these scenarios exactly, so Behaviour Driven Development [BDD] would be a great starting point.
I shall use the E2E testing framework [Cypress.io](https://www.cypress.io/) with [Cucumber Plugin](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)

- commits `d83476d`

Step definitions for each will get defined in `./tests/e2e/support/step_definitions/rental-cars-homepage.js`.
I'll get the MVP working as just as possible and then continue to improve upon the application code.

- commits `94a2702`

Now we have the e2e tests satisfied by using some straightforward mocked logic.
We now have to wire the application up with an API.

We'll use the simple but popular [`axios`](https://github.com/axios/axios) promised base HTTP client to make a request.

For unit tests, we'll use the [`nock`](https://github.com/nock/nock) HTTP server mocking library, and this is to safely mock the requests and not rely on a real HTTP request which can be unpredictable for our tests.

Found that the Given API endpoint doesn't need to proxy through `https://cors.io` as the correct headers get defined.  So calling out to the original Endpoint should work correctly even across a different origin.
I hope 🤔,  but to thoroughly test this, I'm going to use [localtunnel](https://localtunnel.github.io/www/) to generate an external URL.
After running `lt --port 8080` and navigating to the generated URL, I can confirm the API works fine with a different origin.  So this confirms the server is not limited to `SAME_ORIGIN` or a defined list of safe origins.

- commits `db7e352`

Now the application is speaking with the actual API. I can see results provide a `placeType` value.  I can see this can help with some visual aspects, so let's go ahead and break the `AutoCompleteSearchResult` into its Component where we can add this isolated logic.

At this point, we're starting to style the components.  We'll add [`postcss-preset-env`](https://preset-env.cssdb.org/) which enables us to use upcoming CSS features Today. Also [`cssnano`](https://cssnano.co/) for good measure, cssnano will nicely reformat and compress our CSS on production & staging environments as configured in `postcss.config.js`.

We'll use the [BEM](http://getbem.com/) naming convention for naming our classes within our components.

The `AutoCompleteSearchResult` component makes [flexbox](https://caniuse.com/#feat=flexbox) which is suported from IE 10+.

We're also making use of [`rem`](https://www.w3.org/TR/css3-values/#font-relative-lengths) css units which are relative units to the computed `font-size` in the root element.
Why use `rem` over `px`? Simply explained; it allows the best support of browser text size.

Simple `@supports` or modernizer.js checks could be put into place to patch support for older browsers, and we'll add this graceful degradation later.

- commits `0e479de`

Let's continue with the styling.  We're going to format the `searchForm` to look like the site.

// TODO: Search result loader
// TODO: Make autocomplete overlay
// TODO: Keyboard arrow support for location selection.

- commit `f3a2748`

We're going to do some simple CSS patching to make the search results appear on top of the form.

- commit `78e83d0`

Doing some final touches now, Logos, animations and functional patches.

- commit `f9c981b`

After the final touches and a break from the computer, I decided to re-visit the AutoComplete feature and break the functionality down some more and add a missing TODO, keyboard support.

Breaking this component out will make it re-useable in other area's.

We now have `AutoCompleteInput` that can accept configurable inputs for use elsewhere.

It now supports keyboard support, Down/Up arrow keys for selection.

- commit `7196c80`

At this point, I am comfortable with shipping this code challenge. It has been fun flexing my Vue.js skills here, re-engineering the RentalCars.com autocomplete functionality.
Comparing the feature with the live customer-facing production website, I am impressed this autocomplete feature response and reacts much quicker.

Some observations looking through the code on rentalscars.com have me somewhat concerned.
Heavy use of jQuery in-lined into the page which inefficiently performs DOM manipulations.  I am eager to fix and improve performances around this home page. 
