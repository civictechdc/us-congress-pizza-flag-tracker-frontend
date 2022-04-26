describe("Moving the flag from 1-8", () => {
  it("Loads the site", () => {
    cy.visit("/");
  });
  it("HOSS can move flag forward", () => {
    cy.login("FED-HOSS", "FED-HOSS-1010");
    //check that HOSS can click on flag
    cy.visit("/");
    cy.wait(3000);
    cy.clickFirstOrder();
    //check that scan button exists and that HOSS can click on it
    cy.checkForScanButton();
    //now, on scan page, we take the actual actions to move the flag forward
    cy.updateStatus();
    cy.contains("#2").should("be.visible");
    //we're blocked from hammering on the update button (for good reason) so now we go back to the orders page and do this whole thing over
    cy.contains("Orders").click();
    cy.wait(3000);
    cy.clickFirstOrder();
    //check that scan button exists and that HOSS can click on it
    cy.checkForScanButton();
    //now, on scan page, we take the actual actions to move the flag forward
    cy.updateStatus();
    cy.contains("#3").should("be.visible");
    cy.contains("#1").should("not.exist");
    cy.wait(3000);
  });

  it("AOC can move flag forward", () => {
    cy.login("FED-AOC", "FED-AOC-1010");
    cy.visit("/");
    cy.wait(3000);
    cy.clickFirstOrder();
    cy.checkForScanButton();
    //now, on scan page, we take the actual actions to move the flag forward
    cy.updateStatus();
    cy.contains("#4").should("be.visible");
    cy.contains("#2").should("not.exist");
    cy.wait(3000);
    cy.contains("Orders").click();
  });

  it("MAIL can move flag forward", () => {
    cy.login("FED-MAIL", "FED-MAIL-1010");
    cy.visit("/");
    cy.wait(3000);
    cy.clickFirstOrder();
    cy.checkForScanButton();
    //now, on scan page, we take the actual actions to move the flag forward
    cy.updateStatus();
    cy.contains("#5").should("be.visible");
    cy.contains("#3").should("not.exist");
    cy.wait(3000);
    //now, on scan page, we take the actual actions to move the flag forward
  });

  it("Staff can move flag forward", () => {
    cy.login("AL-01", "AL-01-1010");
    cy.visit("/");
    cy.wait(3000);
    cy.clickFirstOrder();
    cy.checkForScanButton();
    cy.updateStatus();
    cy.contains("#6").should("be.visible");
    cy.contains("#4").should("not.exist");
    cy.wait(3000);
    cy.contains("Orders").click();
    cy.clickFirstOrder();
    cy.checkForScanButton();
    //now, on scan page, we take the actual actions to move the flag forward
    cy.updateStatus();
    cy.contains("#7").should("be.visible");
    cy.contains("#5").should("not.exist");
    cy.wait(3000);
    cy.visit("/");
    cy.wait(3000);
    cy.clickFirstOrder();
    cy.checkForScanButton();
    //now, on scan page, we take the actual actions to move the flag forward
    cy.updateStatus();
    cy.contains("#8").should("be.visible");
    cy.contains("#6").should("not.exist");
    cy.wait(3000);
    cy.visit("/");
    cy.wait(4000);
  });
});
