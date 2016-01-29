import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Gifts extends PactResource {
  constructor(pactAPI) {
    const path = '/gifts';

    const methods = {
      purchase: pactMethod({
        method: methodTypes.POST,
        payloadParams: [
          'gifter_first_name',
          'gifter_last_name',
          'gifter_email',
          'recipient_name',
          'payment_amount',
          'stripe_token',
        ],
      }),
    };

    super({pactAPI, path, methods});
  }
}
