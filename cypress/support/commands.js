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

Cypress.Commands.add("clickFirstOrder", () => {
  cy.get("div[class*=orders_flagItem]:first-child").click();
  cy.get("div[class*=orders_mobileStatus]").wait(500).should("be.visible");
});

Cypress.Commands.add("checkForScanButton", () => {
  cy.contains("Scan").click();
  cy.url().should("include", "/scan/");
});

Cypress.Commands.add("updateStatus", () => {
  cy.contains("UPDATE STATUS").click();
  cy.get("div[class=pop-up]").should("be.visible").click();
});
