import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Users extends PactResource {
  constructor(pactAPI) {
    const path = '/users';

    const includeBasic = ['list'];

    const methods = {
      changePassword: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['user_id'],
        path: '{user_id}/password',
      }),

      update: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['user_id'],
        path: '{user_id}',
      }),

      updateEmail: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['user_id'],
        path: '{user_id}/email',
      }),

      updatePayment: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['user_id'],
        path: '{user_id}/card',
      }),

      applyVoucher: pactMethod({
        method: methodTypes.POST,
        urlParams: ['user_id'],
        path: '{user_id}/vouchers',
      }),

      cancel: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['user_id'],
        path: '{user_id}/cancel',
      }),

      reactivate: pactMethod({
        method: methodTypes.POST,
        path: 'me/return',
      }),

      listUniqueCoffees: pactMethod({
        method: methodTypes.GET,
        path: 'me/coffees',
        queryParams: [
          'states',
          'per_page',
          'page',
          'sort',
          'order',
        ],
      }),

      rateCoffee: pactMethod({
        method: methodTypes.POST,
        path: 'me/coffee-ratings',
      }),

      deleteCoffeeRating: pactMethod({
        method: methodTypes.DELETE,
        urlParams: ['sku'],
        path: 'me/coffee-ratings/{sku}',
      }),

      emailInvites: pactMethod({
        method: methodTypes.POST,
        path: '{user_id}/invite',
        urlParams: ['user_id'],
      }),
    };

    super({pactAPI, path, includeBasic, methods});
  }
}
