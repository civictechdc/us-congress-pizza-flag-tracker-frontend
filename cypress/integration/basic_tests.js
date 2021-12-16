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
    cy.get("input[type=password").type(`FED-ADMIN-1010{enter}`);
    cy.get("header").should("contain", "Add");
    cy.getLocalStorage("user").should("contain", "FED-ADMIN");
    //TODO add expectation for username being present in header--to pass this test, the header also needs the username to be present
  });
  it("rejects login if password is incorrect", () => {
    cy.visit("/login");
    cy.get("input[name=username]").type("FED-ADMIN");
    cy.get("input[type=password").type(`zzzzz{enter}`);
    cy.get(".alert-danger").contains("401"); //TODO: Someday we'll probably want an error message that is more human-readable, which will cause this test to fail
  });
});

//   describe("CRUD actions for superuser", ()=>{
//       it("allows FED-ADMIN to create a new order then update it", ()=>{
//           cy.request('POST','/login', {username: "FED-ADMIN", password: "FED-ADMIN-1010"})
//           cy.visit('/add')
//       }
//       )
//   })
