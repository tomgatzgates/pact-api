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
    };

    super({pactAPI, path, methods});
  }
}
