import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class OrderItems extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/orders';
    const methods = {
      list: pactMethod({
        method: methodTypes.GET,
        urlParams: ['order_id'],
        path: '{order_id}/items',
      }),
      // Retrieve a specific record from the API
      retrieve: pactMethod({
        method: methodTypes.GET,
        urlParams: ['order_id', 'id'],
        path: '{order_id}/items/{id}',
      }),
      // Create a record
      create: pactMethod({
        method: methodTypes.POST,
        urlParams: ['order_id'],
        path: '{order_id}/items',
      }),
      // Update an existing record
      update: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['order_id', 'id'],
        path: '{order_id}/items/{id}',
      }),
      // Delete a record
      del: pactMethod({
        method: methodTypes.DELETE,
        urlParams: ['order_id', 'id'],
        path: '{order_id}/items/{id}',
      }),
    };

    super({pactAPI, path, methods});
  }
}
