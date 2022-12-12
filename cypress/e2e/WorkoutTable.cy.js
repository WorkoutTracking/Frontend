describe('WorkoutTable', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/')

    cy.get('#username')
        .type(Cypress.env('CYPRESS_USERNAME'))

    cy.get('#password')
        .type(Cypress.env('CYPRESS_PASSWORD'))

    cy.get('#kc-form-login').submit()
  })

  it('should load previous workout data', () => {
    cy.get('.name').last().should('have.text', 'Name: Push')
  });

  it('should add a new workout called Legs', function () {
    cy.get('#name')
        .type('Legs')

    cy.get('.startNewWorkout').submit()

    cy.get('h1').should('have.text', 'Workout: Legs')
  });
})