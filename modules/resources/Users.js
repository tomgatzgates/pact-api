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

      applyVoucher: pactMethod({
        method: methodTypes.POST,
        urlParams: ['user_id'],
        path: '{user_id}/vouchers',
      }),
    };

    super({pactAPI, path, methods});
  }
}
