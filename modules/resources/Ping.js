import PactResource from '../PactResource';

export default class Ping extends PactResource {
  constructor(pactAPI) {
    const path = '/ping';
    const includeBasic = ['list'];
    super({pactAPI, path, includeBasic});
  }
}
