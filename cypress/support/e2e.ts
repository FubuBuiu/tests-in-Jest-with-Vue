// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

interface AddToCartType{
  index?:number;
  indexes?: Array<number> | string;
}

// ----------For TypeScript to recognize new Cypress commands----------
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getByTestId(value: string): Chainable<JQuery<HTMLElement>>;
      addToCart(value: AddToCartType): void;
    }
  }
}
// --------------------------------------------------------------------

Cypress.on('window:before:load', (win) => {
  (win as any).handleFromCypress = function (request: any) {
    return fetch(request.url, {
      method: request.method,
      headers: request.requestHeaders,
      body: request.requestBody,
    }).then((res) => {
      const content = res.headers
        .get('content-type')!
        .includes('application/json')
        ? res.json()
        : res.text();
      return new Promise((resolve) => {
        content.then((body) => resolve([res.status, res.headers, body]));
      });
    });
  };
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
