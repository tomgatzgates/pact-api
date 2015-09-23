import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Bundles extends PactResource {
  constructor(pactAPI) {
    const path = '/bundles';

    const methods = {
      list: pactMethod({
        method: methodTypes.GET,
      }),
      retrieve: pactMethod({
        method: methodTypes.GET,
        urlParams: ['sku'],
        path: '{sku}',
      }),
    };

    super({pactAPI, path, methods});
  }
}
