describe('search for rates', () => {
  beforeEach(() => cy.visit('/'))

  it('should show search results', () => {
    cy.fixture('rates.json').then((rates) => {
      cy.mockRequest('api/rates*', {
        json: rates,
        type: 'GET',
        alias: 'getRates',
      })
    })

    // amount field
    cy.get('input[aria-label=target-amount]').type('100')

    // currency from field
    cy.get('label').contains('From').next().click()
    cy.get('span').contains('US dollar').click()

    // currency to field
    cy.get('label').contains('To').next().click()
    cy.get('span').contains('Nigerian naira').click()

    // compare rates button
    cy.get('button').contains('Compare Rates').click()

    cy.wait('@getRates').then((interception) => {
      const url = new URL(interception.request.url)
      const sourceCurrency = url.searchParams.get('sourceCurrency')
      const targetCurrency = url.searchParams.get('targetCurrency')

      expect(sourceCurrency).to.equal('USD')
      expect(targetCurrency).to.equal('NGN')
    })

    // url is updated
    cy.url().should('include', 'sourceCurrency=USD&targetCurrency=NGN&amount=100')

    // check that rates are displayed
    cy.get('h3').contains('Disclaimer').should('be.visible')
    cy.get('p').contains(`Showing exchange rate from 100 USD to NGN`).should('be.visible')
  })
})
