import "cypress-localstorage-commands";

Cypress.Commands.add("login", (username, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("api_server")}/signin`,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    auth: { username: username, password: password },
  }).then((response) => {
    cy.setLocalStorage("user", JSON.stringify(response.body));
    Cypress.env("token", response.body.accessToken);
    cy.saveLocalStorage();
  });
});