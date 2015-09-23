import PactResource from '../PactResource';
import pactMethod from '../pactMethod';

export default class Ping extends PactResource {
  constructor(pactAPI) {
    const path = '/ping';
    const includeBasic = ['list'];
    super({pactAPI, path, includeBasic});
  }
}
