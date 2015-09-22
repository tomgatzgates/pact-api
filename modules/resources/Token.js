import PactResource from '../PactResource';
import pactMethod from '../pactMethod';

export default class Token extends PactResource {
  constructor(pactAPI) {
    const includeBasic = {
      path: '/tokens',
      methods: ['create'],
    };

    const methods = {
      del: pactMethod({
        method: 'del',
        path: '/tokens/me',
      }),
    };

    super({pactAPI, methods, includeBasic});
  }
}
