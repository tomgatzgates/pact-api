import request from 'superagent';
import invariant from 'invariant';

function pactMethod({method, path, includeBasic}) {
  return () => {
    if (includeBasic) {
      includeBasic.forEach(method => {
        this[method] = this.request.bind(this, method, path);
      });
    } 
  }
}

const basicMethods = {
  create: pactMethod({
    method: 'post',
  }),

  list: pactMethod({
    method: 'get',
  }),

  retrieve: pactMethod({
    method: 'get',
    path: '/{id}',
    urlParams: ['id'],
  }),

  update: pactMethod({
    method: 'post',
    path: ''
  }),
}
