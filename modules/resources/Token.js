class Token extends PactResource {
  constructor(pactAPI) {

    const methods = {
      retrieve: pactMethod({
        method: 'get',
        path: '/allTokens'
      }),
      del: pactMethod({
        method: 'del',
        path: '/tokens/me'
      }),
    };
    const path = '/tokens';
    const includeBasic = ['create'];

    super({pactAPI, methods, path, includeBasic});
  }
}
