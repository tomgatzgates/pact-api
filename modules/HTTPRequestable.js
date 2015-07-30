import request from 'superagent';

export default class HTTPRequestable {
  // Private API: convenience request methods
  _get(url, callback) {
    const req = request.get(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.end(callback);
  }
  _post(url, payload, callback) {
    const req = request.post(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.type('form')
      .send(payload)
      .end(callback);
  }
  _put(url, payload, callback) {
    const req = request.put(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.send(payload)
      .end(callback);
  }
  _del(url, callback) {
    const req = request.del(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.end(callback);
  }
}
