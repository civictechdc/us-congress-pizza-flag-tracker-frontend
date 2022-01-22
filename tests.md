# Setting Up Cypress Tests Locally

Cypress is an amazing tool but requires a little setup.

- Cypress should be installed automatically once you pull down the branch and run `npm install`.
- Copy cypress.env.json.example to cypress.env.json and adjust to your local environment. (Since the tests actually write to the database, please don't use the Heroku backend.)
- Start your frontend the normal way, and your backend (if you're running backend locally)
- You should be able to open cypress then from a terminal window with `cypress open` but if that doesn't work, use `npm run cypress:open`. It might take a few tries to initialize Cypress the first time.
- When Cypress opens, click `basic_tests.js` . An instance of your browser will open with the app. At this point, the tests should run automatically. Sit back and watch!
