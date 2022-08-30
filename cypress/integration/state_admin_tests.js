describe("CRUD actions for state", () => {
  before(() => {
    cy.resetdb();
    //This is a dumb setup, and we can change it later, but for now, the best way I can think of to ensure that there is always an order that our one non-admin state user can see, and always one that she cannot see, is to add both in this test suite.
    cy.login("FED-ADMIN", "FED-ADMIN-1010");
    cy.restoreLocalStorage();

    //Create an MA-01 order (which SHOULD be visible to our non-admin user)
   cy.createSampleOrder("9999","MA-01","MA")

    //create an MA-02 order (which SHOULD NOT be visible to our non-admin user)
    cy.createSampleOrder("9998","MA-02","MA")
    cy.clearLocalStorage();

    /* now, after logging in as admin, creating the order, and logging out, can we finally log in as MA-01
     */
    cy.login("MA-01", "MA-01-1010");
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("allows state users to see only their orders", () => {
    cy.visit("/");
    cy.get("p[data-order-number=9999]");
    cy.get("p[data-order-number=9998]").should("not.exist");
  });
  it("does not allow state user to create a new order, by redirecting to main page", () => {
    cy.visit("/add");
    cy.url().should("be.equal", `${Cypress.env("host")}/`);
  });
  it("does not allow state user to advance flag status if status < 5", ()=> {
    cy.visit("/");
    cy.get("p[data-order-number=9999]").click();
    cy.get("button[data-button-function='Refuse Enabled']");
    cy.get("main > div > div:nth-child(5) > label").should("contain", "#1 - Constituent")
  })
///no need to test that state user CAN advance flag status, because we test that in flag_scan.js
});
