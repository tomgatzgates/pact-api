import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methods from '../methods';

export default class Token extends PactResource {
  constructor(pactAPI) {
    const path = '/tokens';

    const includeBasic = ['create'];

    const methods = {
      del: pactMethod({
        method: methods.DELETE,
        path: '/me',
      }),
    };

    super({pactAPI, path, methods, includeBasic});
  }
}
