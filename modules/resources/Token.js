import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Token extends PactResource {
  constructor(pactAPI) {
    const path = '/tokens';

    const includeBasic = ['create'];

    const methods = {
      del: pactMethod({
        method: methodTypes.DELETE,
        path: '/me',
      }),
    };

    super({pactAPI, path, methods, includeBasic});
  }
}
