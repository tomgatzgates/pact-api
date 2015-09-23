import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methods from '../methods';

export default class Bundles extends PactResource {
  constructor(pactAPI) {
    const path = '/bundles';

    const methods = {
      list: pactMethod({
        method: methods.GET,
      }),
      retrieve: pactMethod({
        method: methods.GET,
        urlParams: ['sku'],
        path: '{sku}',
      }),
    };

    super({pactAPI, path, methods});
  }
}
