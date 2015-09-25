import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Account extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/account';

    const methods = {
      fetch: pactMethod({
        method: methodTypes.GET,
      }),
    };

    super({pactAPI, path, methods});
  }
}
