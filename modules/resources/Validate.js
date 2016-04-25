import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Validate extends PactResource {
  constructor(pactAPI) {
    const path = '/validate';

    const methods = {
      password: pactMethod({
        method: methodTypes.POST,
        path: 'password',
      }),
    };

    super({pactAPI, path, methods});
  }
}
