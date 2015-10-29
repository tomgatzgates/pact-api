import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Products extends PactResource {
  constructor(pactAPI) {
    const path = '/products';
    const methods = {
      list: pactMethod({
        method: methodTypes.GET,
        queryParams: ['sku', 'available', 'page', 'per_page'],
      }),
      retrieve: pactMethod({
        method: methodTypes.GET,
        urlParams: ['sku'],
        path: '{sku}',
      }),
      bundle: pactMethod({
        method: methodTypes.GET,
        path: 'bundle',
        queryParams: ['sku', 'available', 'page', 'per_page'],
      }),
      hardware: pactMethod({
        method: methodTypes.GET,
        path: 'hardware',
        queryParams: ['sku', 'available', 'page', 'per_page'],
      }),
      coffee: pactMethod({
        method: methodTypes.GET,
        path: 'coffee',
        queryParams: [
          'sku',
          'available',
          'preparation',
          'best_for',
          'decaf',
          'limited',
          'origin',
          'producer',
          'varietal',
          'altitude',
          'page',
          'per_page',
        ],
      }),
    };

    super({pactAPI, path, methods});
  }
}
