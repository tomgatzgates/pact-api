import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Identity extends PactResource {
  constructor(pactAPI) {
    const path = '/identities';

    const methods = {
      create: pactMethod({
        method: methodTypes.POST,
      }),
      update: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['id'],
        path: '{id}',
      }),
    };

    super({pactAPI, path, methods});
  }
}
