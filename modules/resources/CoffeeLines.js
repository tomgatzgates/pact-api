import PactResource from '../PactResource';

export default class CoffeeLines extends PactResource {
  constructor(pactAPI) {
    const path = '/coffee_lines';
    const includeBasic = [
      'list',
      'retrieve',
    ];
    super({pactAPI, path, includeBasic});
  }
}
