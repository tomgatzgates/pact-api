import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Users extends PactResource {
  constructor(pactAPI) {
    const path = '/users';

    const methods = {
      create: pactMethod({
        method: methodTypes.POST,
      }),

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

      updatePayment: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['user_id'],
        path: '{user_id}/card',
      }),
    };

    super({pactAPI, path, methods});
  }
}
