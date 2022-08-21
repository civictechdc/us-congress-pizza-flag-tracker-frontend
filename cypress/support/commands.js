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
  cy.get("div[class*=orders_flagItem_]:first-child").click();
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

Cypress.Commands.add("createSampleOrder", (order_number, office_code, state) => {
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
      order_number: order_number,
      home_office_code: office_code,
      usa_state: state,
    },
  }).then((response) => {
    if (response.status < 400) {
      console.log(response);
    } else throw error();
  });
});

Cypress.Commands.add("resetdb", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("api_server")}/reset`,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
})
//not in use right now but they do work i think 
// Cypress.Commands.add("getOrder", (uuid)=> {
//   cy.login("FED-ADMIN", "FED-ADMIN-1010");
//   cy.request({
//     method: "GET",
//     url: `${Cypress.env("api_server")}/orders/${uuid}`,
//     headers: {
//       "Content-type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "X-Access-Tokens": Cypress.env("token"),
//     },
//   }).then((response) => {
//       return response.body;
//   });
// })

// Cypress.Commands.add("editOrder", (order)=> {
//   cy.login("FED-ADMIN", "FED-ADMIN-1010");
//   console.log(order)
//   cy.request({
//     method: "PUT",
//     url: `${Cypress.env("api_server")}/orders/${order.uuid}`,
//     headers: {
//       "Content-type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "X-Access-Tokens": Cypress.env("token"),
//     },
//     body: {
//       order_number: order.order_number,
//       home_office_code: order.office_code,
//       usa_state: order.state,
//       order_status_id: order.status.sequence_num
//     },
//   }).then((response) => {
//     if (response.status < 400) {
//       console.log(response);
      
//     } else throw error();
//   });
// })