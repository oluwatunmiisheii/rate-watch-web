/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare namespace Cypress {
  interface Chainable<Subject> {
    mockRequest(
      url: string,
      options: {
        json: object
        alias: string
        type?: 'GET' | 'POST' | 'PUT' | 'DELETE'
      },
    ): Chainable<object>
    setCookiesPolicy(): void
  }
}

// -- This is a parent command --
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
Cypress.Commands.add(
  'mockRequest',
  (
    url: string,
    options: {
      json: object
      alias?: string
      type?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    },
  ) => {
    const { json, type = 'GET', alias } = options

    cy.intercept(type, url, {
      statusCode: 200,
      body: json,
    }).as(alias ?? 'mockedRequest')
  },
)

Cypress.Commands.add('setCookiesPolicy', () => {
  cy.setCookie('rw-cookie-consent', 'true')
})
