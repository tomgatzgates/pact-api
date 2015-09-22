import PactResource from '../PactResource';
import pactMethod from '../pactMethod';

export default class Token extends PactResource {
  constructor(pactAPI) {
    const path = '/tokens';

    const includeBasic = ['create'];

    const methods = {
      del: pactMethod({
        method: 'del',
        path: '/me',
      }),
    };

    super({pactAPI, path, methods, includeBasic});
  }
}
