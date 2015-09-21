import PactResource from '../PactResource';

class Token extends PactResource {
  constructor({key, base}) {
    super({
      key,
      base,
      path: '/tokens',
      includeBasic: ['get', 'del']
    });
  }
}
