import PactResource from '../PactResource';

export default class UserFlags extends PactResource {
  constructor(pactAPI) {
    const path = '/user1_flags';

    const includeBasic = ['create'];

    super({pactAPI, path, includeBasic});
  }
}
