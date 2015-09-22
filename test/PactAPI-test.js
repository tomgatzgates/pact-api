import PactAPI from '../modules/PactAPI';
import superagent from 'superagent';

describe('PactAPI', () => {
  let instance;
  const fakeBase = 'Where did you get those clothes? At the toilet store?';
  const fakeToken = 'Dorothy Mantooth is a saint';
  const fakeVersion = 'Baxter';

  const reqMethods = {};

  const sendSpy = sinon.stub().returns(reqMethods);
  const authSpy = sinon.stub().returns(reqMethods);
  const endSpy = sinon.stub().returns(reqMethods);

  reqMethods.send = sendSpy;
  reqMethods.auth = authSpy;
  reqMethods.end = endSpy;

  beforeEach(() => {
    ['get', 'put', 'post', 'del'].forEach((method) => {
      sinon.stub(superagent, method).returns(reqMethods);
    });
    instance = new PactAPI();

    sendSpy.reset();
    authSpy.reset();
    endSpy.reset();
  });

  afterEach(() => {
    ['get', 'put', 'post', 'del'].forEach((method) => {
      superagent[method].restore();
    });
  });

  describe('The constructor', () => {
    it('Can be used without any args', () => {
      assert.ok(new PactAPI().getAPIField('version'));
    });
    it('Can be passed an auth key', () => {
      assert.ok(new PactAPI(fakeToken).getAPIField('key') === fakeToken);
    });
    it('Can be passed a version', () => {
      instance = new PactAPI(null, fakeVersion);
      assert.ok(instance.getAPIField('version') === fakeVersion);
    });
    it('Can be passed a base URL', () => {
      instance = new PactAPI(null, null, fakeBase);
      assert.ok(instance.getAPIField('base') === fakeBase);
    });
  });

  describe('setAPIBase', () => {
    it('Sets the base URL for all requests', () => {
      instance.setAPIBase(fakeBase);
      assert.ok(instance.base === fakeBase);
    });

    it('Throws if called without a base', () => {
      assert.throws(() => {
        instance.setBase();
      });
    });
  });

  describe('_getEndpoints', () => {
    it('Generates API endpoint URLs using the base URL', () => {
      instance.setBase(fakeBase);
      const endpoints = instance._getEndpoints();
      Object.keys(endpoints).forEach((k) => {
        const endpoint = endpoints[k];
        assert.include(endpoint, fakeBase);
      });
    });

    it('Generates different endpoints if the base URL is changed', () => {
      let endpoints;

      instance.setBase('hurr');
      endpoints = instance._getEndpoints();
      Object.keys(endpoints).forEach((k) => {
        const endpoint = endpoints[k];
        assert.include(endpoint, 'hurr');
      });

      instance.setBase('drrrr');
      endpoints = instance._getEndpoints();
      Object.keys(endpoints).forEach((k) => {
        const endpoint = endpoints[k];
        assert.include(endpoint, 'drrrr');
      });
    });
  });

  describe('login', () => {
    const LOGIN = 'ron';
    const PASS = 'wholewheelofcheese';

    it(`Throws if the login or password aren't present`, () => {
      assert.throws(() => instance.login());
      assert.throws(() => instance.login('hurr'));
    });

    it('POSTs to the correct URL', () => {
      const spy = sinon.stub(instance, '_post');

      instance.setBase(fakeBase);
      instance.login(LOGIN, PASS);
      assert.equal(spy.lastCall.args[0], instance._getEndpoints().LOGIN);
    });

    it('POSTs the login and password as JSON', () => {
      const spy = sinon.stub(instance, '_post');

      instance.login(LOGIN, PASS);
      assert.deepEqual(spy.lastCall.args[1], {
        email: LOGIN,
        password: PASS,
      });
    });

    it('Returns a promise', () => {
      const prom = instance.login(LOGIN, PASS);
      assert.ok(prom.then);
    });

    it(`The promise is rejected if there's an error`, () => {
      const err = 'THER WAS AN ERROR';
      superagent.post.restore();

      sinon.stub(superagent, 'post', (url, params, callback) => {
        callback(err);
      });
      const prom = instance.login(LOGIN, PASS);
      assert.isRejected(prom);
    });

    it(`The promise resolves with the token`, () => {
      const mockResp = {body: {token: fakeToken}};
      superagent.post.restore();

      sinon.stub(superagent, 'post', (url, params, callback) => {
        callback(null, mockResp);
      });
      const prom = instance.login(LOGIN, PASS);
      assert.isFulfilled(prom);
      assert.eventually.equal(prom, {token: fakeToken});
    });

    it('Sets the token on the PactAPI instance if the promise resolved', () => {
      const mockResp = {body: {token: fakeToken}};
      superagent.post.restore();

      sinon.stub(superagent, 'post', (url, params, callback) => {
        callback(null, mockResp);
      });
      const prom = instance.login(LOGIN, PASS);
      prom.then(() => {
        assert.equal(instance.getToken(), fakeToken);
      });
    });
  });

  describe('Logout', () => {
    it(`Throws if the token is not set on the instance`, () => {
      assert.throws(() => instance.logout());
    });

    it('DELETEs on the correct URL', () => {
      const spy = sinon.stub(instance, '_del');

      instance.setBase(fakeBase);
      instance.setToken(fakeToken);
      instance.logout();
      assert.equal(spy.lastCall.args[0], instance._getEndpoints().LOGOUT);
    });

    it('DELETEs the token set on the instance', () => {
      const spy = sinon.stub(instance, '_del');
      instance.setToken(fakeToken);
      instance.logout();
      assert.ok(spy.calledOnce);
    });

    it('Returns a promise', () => {
      instance.setToken(fakeToken);
      const prom = instance.logout();
      assert.ok(prom.then);
    });

    it(`The promise is rejected if there's an error`, () => {
      const err = 'THER WAS AN ERROR';
      superagent.del.restore();
      sinon.stub(superagent, 'del', (url, params, callback) => {
        callback(err);
      });

      instance.setToken(fakeToken);
      const prom = instance.logout();
      assert.isRejected(prom);
    });

    it(`The promise resolves with the body`, () => {
      const mockResp = {body: 'durr'};
      superagent.del.restore();
      sinon.stub(superagent, 'del', (url, params, callback) => {
        callback(null, mockResp);
      });

      instance.setToken(fakeToken);

      const prom = instance.logout();
      assert.isFulfilled(prom);
      assert.eventually.equal(prom, 'durr');
    });
  });
});
