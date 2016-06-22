import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class OrderItems extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/orders';
    const methods = {
      list: pactMethod({
        method: methodTypes.GET,
        urlParams: ['orderId'],
        path: '{orderId}/items',
      }),
      // Retrieve a specific record from the API
      retrieve: pactMethod({
        method: methodTypes.GET,
        urlParams: ['orderId', 'id'],
        path: '{orderId}/items/{id}',
      }),
      // Update an existing record
      update: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['orderId', 'id'],
        path: '{orderId}/items/{id}',
      }),
    };

    super({pactAPI, path, methods});
  }
}
