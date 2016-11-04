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
      listCoffees: pactMethod({
        method: methodTypes.GET,
        path: 'coffee',
        queryParams: [
          'sku',
          'available',
          'preparation',
          'best_for',
          'decaf',
          'limited',
          'page',
          'per_page',
        ],
      }),
      coffeeBySlug: pactMethod({
        method: methodTypes.GET,
        urlParams: ['slug'],
        path: 'coffee/{slug}',
      }),
      retrieve: pactMethod({
        method: methodTypes.GET,
        urlParams: ['sku'],
        path: '{sku}',
      }),
      preorder: pactMethod({
        method: methodTypes.POST,
        urlParams: ['slug'],
        path: '{slug}/preorder',
      }),
    };

    super({pactAPI, path, methods});
  }
}
