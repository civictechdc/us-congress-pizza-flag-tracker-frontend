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
  cy.get("div[class*=orders_mobileStatus]").wait(1500).should("be.visible");
});

Cypress.Commands.add("checkForScanButton", () => {
  cy.contains("Scan").click();
  cy.url().should("include", "/scan/");
});

Cypress.Commands.add("updateStatus", () => {
  cy.wait(2000);
  cy.get("button[data-button-function='Update Enabled']").click();
  cy.wait(2000);
  cy.get("div[class=pop-up]").should("be.visible").click();
});

Cypress.Commands.add("createSampleOrder", () => {
  cy.login("FED-ADMIN", "FED-ADMIN-1010");
  cy.request({
    method: "POST",
    url: `${Cypress.env("api_server")}/orders/create`,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-Access-Tokens": Cypress.env("token"),
    },
    body: {
      order_number: "999999",
      home_office_code: "AL-01",
      usa_state: "AL",
    },
  }).then((response) => {
    if (response.status < 400) {
      console.log(response);
    } else throw error();
  });
});
