describe('Workout', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/workout/5498f676-d9ec-4dba-9e16-164dc782bfa5')

        cy.get('#username')
            .type(Cypress.env('CYPRESS_USERNAME'))

        cy.get('#password')
            .type(Cypress.env('CYPRESS_PASSWORD'))

        cy.get('#kc-form-login').submit()
    })

    it('should add exercise to Legs workout', function () {
        cy.get('h1').should('have.text', 'Workout: Legs')

        cy.get('#name')
            .type('Squat')

        cy.get('form').submit()
    });

    it('should add set to workout', function () {
        cy.get('.addSet').click()
    });

    it('should update set', function () {
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