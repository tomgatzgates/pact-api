import proxyquire from 'proxyquire';

let superStub = {};
let _url = null;

const PactAPI = proxyquire('../../src/index', {
  superagent: superStub
});

beforeEach(() => {
  _url = null;
  superStub.get = function(url) {
    _url = url;
    return this;
  };
  superStub.post = function(url) {
    _url = url;
    return this;
  };
  superStub.put = function(url) {
    _url = url;
    return this;
  };
  superStub.del = function(url) {
    _url = url;
    return this;
  };
  superStub.end = function(callback) {
    callback(null, 'two');
  };
});

describe('getOrders', () => {
  describe('fetches orders for the given user', () => {
    it('calling the http module correctly', function() {
      return PactAPI.getOrders(1234).then(function() {
        expect(_url).to.equal('https://pact-core.herokuapp.com/users/1234/orders');
      });
    });

  });
});
