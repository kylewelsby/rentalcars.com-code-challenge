# Rentalcars.com Code Challenge

BookingGo RentalCars.com department code challenge completed by [Kyle Welsby](https://github.com/kylewelsby).

Available online --> https://static-demo.mekyle.com/rentalcars.com/

Here I shall use the tools I feel are right for this project in order to safely satisfy the requirements defined in [CHALLENGE.pfd](./CHALLENGE.pdf).

Tools, Frameworks and Libries included are;

* Cypress.io - testing tool that allows ease of e2e testing
* Vue.js - frontend framework that I personally find the most fun to write
* Jest - a JavaScript testing library used for unit-testing

While working on this code challege, I made [notes](./NOTES.md) along the journey.

## System Dependencies

This project will depend on [Node.js](https://nodejs.org/en/) being installed.
See the documentation to install the latest stable version.
_At time of writing the latest stable verion is Node.js 10_

## Installation

Within the project working directory, most common commands are defined as NPM scripts listed below.

### `install`

Install all the application dependencies required to run locally

    npm install

### `run serve`

Open a HTTP server and make available the application.  The default port will be `:8080`.

    npm run serve

You may open your favorate browser to [http://localhost:8080](http://localhost:8080)

### `test`

Default test entrypoint, will unit test and end-to-end test the application.

    npm test

### `run test:unit`

Run the Unit tests only.

    npm run test:unit

You can run unit tests and watch for changes and re-test by appending `:watch` onto the commands

    npm run test:unit:watch

### `run test:e2e`

Run the End-to-End tests only.

    npm run test:e2e

You can run unit tests and watch for changes and re-test by appending `:watch` onto the commands

    npm run test:e2e:watch

End-to-end tests are found within `./tests/e2e/specs` directory, step definitions are within `./tests/e2e/support/step_definitions`.

## ☝️ Deployment

This demo is deployed on AWS S3 bucket as a single page application.

https://static-demo.mekyle.com/rentalcars.com/

_The `npm run deploy` script will not work for you_

## 🎓 License

MIT: https://kylewelsby.mit-license.org
