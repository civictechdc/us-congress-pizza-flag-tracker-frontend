// describe("CRUD actions for state", () => {
//   before(() => {
//     //This is a dumb setup, and we can change it later, but for now, the best way I can think of to ensure that there is always an order that our one non-admin state user can see, and always one that she cannot see, is to add both in this test suite.
//     cy.login("FED-ADMIN", "FED-ADMIN-1010");
//     cy.restoreLocalStorage();

//     //Create an MA-01 order (which SHOULD be visible to our non-admin user)
//     cy.request({
//       method: "POST",
//       url: `${Cypress.env("api_server")}/orders/create`,
//       headers: {
//         "Content-type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "x-access-tokens": Cypress.env("token"),
//       },
//       body: {
//         order_number: "9999",
//         usa_state: "MA",
//         home_office_code: "MA-01",
//       },
//     }).then((response) => {
//       expect(response.body).to.have.property("home_office_code", "MA-01");
//     });

//     //create an MA-02 order (which SHOULD NOT be visible to our non-admin user)
//     cy.request({
//       method: "POST",
//       url: `${Cypress.env("api_server")}/orders/create`,
//       headers: {
//         "Content-type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "x-access-tokens": Cypress.env("token"),
//       },
//       body: {
//         order_number: "9998",
//         usa_state: "MA",
//         home_office_code: "MA-02",
//       },
//     }).then((response) => {
//       expect(response.body).to.have.property("home_office_code", "MA-02");
//     });
//     cy.clearLocalStorage();

//     /* now, after logging in as admin, creating the order, and logging out, can we finally log in as MA-01
//      */
//     cy.login("MA-01", "MA-01-1010");
//     cy.saveLocalStorage();
//   });

//   beforeEach(() => {
//     cy.restoreLocalStorage();
//   });

//   it("allows state users to see only their orders", () => {
//     cy.visit("/");
//     cy.get("div[data-order-number=0]").within(() => {
//       cy.get("p:first").should("contain", "9999");
//       cy.contains("9998").should("not.exist");
//     });
//   });
//   it("does not allow state user to create a new order ", () => {
//     cy.visit("/add");
//     cy.url().should("be.equal", `${Cypress.env("host")}/login`);
//   });

//   after(() => {
//     cy.login("FED-ADMIN", "FED-ADMIN-1010");
//     cy.restoreLocalStorage();

//     cy.request({
//       method: "DELETE",
//       url: `${Cypress.env("api_server")}/orders/${orderUUID}`,
//       headers: {
//         "Content-type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "x-access-tokens": Cypress.env("token"),
//       },
//     }).then((response) => {
//       expect(response.status).to.equal("204");
//     });
//   });
// });
