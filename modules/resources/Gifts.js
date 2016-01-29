import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Gifts extends PactResource {
  constructor(pactAPI) {
    const path = '/gifts';

    const methods = {
      create: pactMethod({
        method: methodTypes.POST,
      }),
    };

    super({pactAPI, path, methods});
  }
}
