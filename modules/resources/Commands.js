import PactResource from '../PactResource';

/**
 * Send a {@link jSON web token} to the server to be decrypted and perform a
 * pre-defined action which has been encrtypted into the token.
 * {@link https://jwt.io/}
 */
export default class Commands extends PactResource {
  constructor(pactAPI) {
    const path = '/commands';
    const includeBasic = ['create'];

    super({pactAPI, path, includeBasic});
  }
}
