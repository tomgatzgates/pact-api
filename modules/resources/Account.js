import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methods from '../methods';

export default class Account extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/account';

    const methods = {
      fetch: pactMethod({
        method: methods.GET,
      }),
    };

    super({pactAPI, path, methods});
  }
}
