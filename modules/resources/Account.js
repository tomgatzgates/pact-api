import PactResource from '../PactResource';
import pactMethod from '../pactMethod';

export default class Account extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/account';

    const methods = {
      fetch: pactMethod({
        method: 'get',
      }),
    };

    super({pactAPI, path, methods});
  }
}
