import PactResource from '../PactResource';

export default class Baskets extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/baskets';
    const includeBasic = [
      'create',
    ];
    super({pactAPI, path, includeBasic});
  }
}
