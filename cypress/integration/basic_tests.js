import { getByAltText } from "@testing-library/react";

describe("My First Test", () => {
  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
});

describe("Loading and logging in", () => {
  it("Loads the site", () => {
    cy.visit("/");
  });
  it("Can log in using admin credentials", () => {
    cy.visit("/login");
    cy.get("input[name=username]").type("FED-ADMIN");
    cy.get("input[type=password]").type(`FED-ADMIN-1010{enter}`);
    // cy.get("button[data-button-function='Login']").click();
    cy.visit("/");
    cy.get("nav").should("contain", "Add");
    cy.getLocalStorage("user").should("contain", "FED-ADMIN");
    cy.get("nav").should("contain", "FED-ADMIN");
  });
  it("rejects login if password is incorrect", () => {
    cy.visit("/login");
    cy.get("input[name=username]").type("FED-ADMIN");
    cy.get("input[type=password").type(`zzzzz{enter}`);
    cy.get(".alert-danger").contains("401"); //TODO: Someday we'll probably want an error message that is more human-readable, which will cause this test to fail
  });
});

describe("CRUD actions for superuser", () => {
  before(() => {
    cy.login("FED-ADMIN", "FED-ADMIN-1010");
  });

  beforeEach(() => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("api_server")}/reset`,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    cy.restoreLocalStorage();
  });

  it("allows FED-ADMIN to create a new order ", () => {
    cy.visit("/add");
    //TODO add a name to the disabled Office input so that we can do cy.get("input[name=congressional_office]").should("be.disabled")
    cy.get("input[name=order_number]").type("1234");
    cy.get("input[id=edit-us-state]").type(`CO{enter}`);
    // cy.get("input[id=react-select-5-input]").click().find('[id*="5-option"]').eq(1).should("equal","CO-01").type("CO-01");
    //I'd like the above test to work but I'm having trouble getting Cypress to work with the react-selector. As a compromise/stopgap we use the below instead:
    cy.get("input[id=edit-office]").click().type(`CO-01{enter}`);
    cy.get(".btn").click();
    cy.get("h3").contains("successfully!");
  });
  it("does not allow FED-ADMIN to create a new order with a duplicate order number", () => {
    cy.visit("/add");
    //TODO add a name to the disabled Office input so that we can do cy.get("input[name=congressional_office]").should("be.disabled")
    cy.get("input[name=order_number]").type("1234");
    cy.get("input[id=edit-us-state]").type(`CO{enter}`);
    // cy.get("input[id=react-select-5-input]").click().find('[id*="5-option"]').eq(1).should("equal","CO-01").type("CO-01");
    //I'd like the above test to work but I'm having trouble getting Cypress to work with the react-selector. As a compromise/stopgap we use the below instead:
    cy.get("input[id=edit-office]").click().type(`CO-01{enter}`);
    cy.get(".btn").click();
    //response should be 500--or later, a more specific error--not sure how to get response code here though! Possibly what is needed is a frontend error message, which does not yet exist.
  });

  it("allows FED-ADMIN to edit an order", () => {
    cy.visit("/orders");
    cy.get("p[class*='orders_orderNum']").contains("10").click(); //danger, this may break upon implementing new layout if class name changes
    cy.get("a[class*='orders_orderLinks']").eq(0).click();
    cy.get("input[id=edit-us-state]").first().click().type(`CO{enter}`);
    cy.get("input[id=edit-office]").first().click().type(`CO-02{enter}`);
    //why is it different on the edit screen? where do these numbers in the ids come from?
    cy.get(".btn-success").click();
    cy.visit("/orders");
    cy.get("p[class*='orders_orderNum']")
      .contains("10")
      .next()
      .children()
      .first()
      .should("contain", "CO-02");
  });
  it("allows FED-ADMIN to delete an order", () => {
    cy.visit("/orders");
    cy.get("p[class*='orders_orderNum']").contains("10").click(); //danger, this may break upon implementing new layout if class name changes
    cy.get("a[class*='orders_orderLinks']").eq(0).click();
    cy.get(".badge-danger").click(); //there probably should be a confirmation step here both before and after deletion, SO, this test will need to be updated
    cy.get("main").wait(1000).should("not.contain", "10"); //cypress docs say not to use wait but otherwise it's testing against the empty, pre-rendered table
  });
});
