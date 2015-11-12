import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Recurrables extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/recurrables';
    const includeBasic = [
      'list',
      'retrieve',
      'create',
      'update',
    ];

    const methods = {
      activate: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['id'],
        path: '{id}/activate',
      }),

      pause: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['id'],
        path: '{id}/pause',
      }),

      cancel: pactMethod({
        method: methodTypes.PATCH,
        urlParams: ['id'],
        path: '{id}/cancel',
      }),

      pauseAll: pactMethod({
        method: methodTypes.PATCH,
        path: 'pause',
      }),

      activateAll: pactMethod({
        method: methodTypes.PATCH,
        path: 'activate',
      }),
    };

    super({pactAPI, path, includeBasic, methods});
  }
}
