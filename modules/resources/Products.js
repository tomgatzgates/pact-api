import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Products extends PactResource {
  constructor(pactAPI) {
    const path = '/products';
    const includeBasic = ['list'];
    const methods = {
      retrieve: pactMethod({
        method: methodTypes.GET,
        urlParams: ['sku'],
        path: '{sku}',
      }),
    }
    super({pactAPI, path, includeBasic, methods});
  }
}
