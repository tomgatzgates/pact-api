import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Credits extends PactResource {
  constructor(pactAPI) {
    const path = '/credits';

    const methods = {
      retrieve: pactMethod({
        method: methodTypes.GET,
        urlParams: ['uid'],
        path: '{uid}',
      }),
    };

    super({pactAPI, path, methods});
  }
}
