import PactResource from '../PactResource';

class Token extends PactResource {
  constructor(api) {
    super(api);

    this.get = pactMethod.call(this, {
      path: '/tokens',
      includeBasic: ['get', 'del']
    });
  }
}
