describe("Game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
  })

  it("should render the form", () => {
    cy.get("form").should("exist")
    cy.get("#room").should("exist")
    cy.get("button").contains("Join").should("exist")
  })

  it("should allow typing in the room id input", () => {
    const roomId = "room-id-1"
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get("#room").type(roomId).should("have.value", roomId)
  })
})
