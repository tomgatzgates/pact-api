import PactResource from '../PactResource';

export default class Discourse extends PactResource {
  constructor(pactAPI) {
    const path = '/discourse';

    const includeBasic = ['create'];

    super({ pactAPI, path, includeBasic });
  }
}
