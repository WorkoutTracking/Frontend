describe('WorkoutTable', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/')

    cy.get('#username')
        .type('carlovankessel@yahoo.nl').should('have.value', 'carlovankessel@yahoo.nl')

    cy.get('#password')
        .type('admin').should('have.value', 'admin')

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

  it('should add exercise to Legs workout', function () {
    cy.get('.editWorkoutButton').first().click()
    cy.get('h1').should('have.text', 'Workout: Legs')

    cy.get('#name')
        .type('Squat')

    cy.get('form').submit()
  });

  it('should add set to workout', function () {
    cy.get('.editWorkoutButton').first().click()
    cy.get('.addSet').click()
  });

  it('should update set', function () {
    cy.get('.editWorkoutButton').first().click()
    cy.wait(1000)

    cy.get('.setsInput')
        .type('2')

    cy.get('.repsInput')
        .type('8')

    cy.get('.weightInput')
        .type('120')

    cy.get('.restInput')
        .type('5')

    cy.get('.updateSet').submit()

    cy.get('.setsInput').should('have.value', '2')
    cy.get('.repsInput').should('have.value', '8')
    cy.get('.weightInput').should('have.value', '120')
    cy.get('.restInput').should('have.value', '5')

  });

})