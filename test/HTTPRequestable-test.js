import HTTPRequestable from '../modules/HTTPRequestable';
import superagent from 'superagent';

const fakeUrl = 'The human torch was denied a bank loan';
const fakeToken = 'The arsonist had oddly shaped feet';
const fakePayload = 'Unique New York';
const fakeCallback = sinon.spy();

describe('HTTPRequestable', () => {

  let instance;

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
    instance = new HTTPRequestable();
    sendSpy.reset();
    authSpy.reset();
    endSpy.reset();
    fakeCallback.reset();
  });

  afterEach(() => {
    ['get', 'put', 'post', 'del'].forEach((method) => {
      superagent[method].restore();
    });
  });

  describe(`The constructor`, () => {
    it('Can be passed an auth token', () => {
      assert.equal(new HTTPRequestable(fakeToken).token, fakeToken);
    });
  });

  describe('setToken', () => {
    it('Sets the token used for authentication', () => {
      instance.setToken(fakeToken);
      assert.equal(instance.token, fakeToken);
    });
  });

  describe('_get', () => {
    it(`GETs the given URL`, () => {
      instance._get(fakeUrl);
      assert.ok(superagent.get.calledOnce);
      assert.ok(superagent.get.calledWith(fakeUrl));
    });

    it(`Sets authentication when a token is present`, () => {
      instance.setToken(fakeToken);
      instance._get(fakeUrl, fakeCallback);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it(`Does not use auth when there's no token present`, () => {
      instance._get(fakeUrl, fakeCallback);
      assert.notOk(authSpy.calledOnce);
    });

    it(`Has it's callback called when the request ends`, () => {
      instance._get(fakeUrl, fakeCallback);
      assert.ok(endSpy.calledWith(fakeCallback));
    });
  });

  describe('_post', () => {
    it(`POSTs to the given URL`, () => {
      instance._post(fakeUrl);
      assert.ok(superagent.post.calledOnce);
      assert.ok(superagent.post.calledWith(fakeUrl));
    });

    it(`Sets authentication when a token is present`, () => {
      instance.setToken(fakeToken);
      instance._post(fakeUrl);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it(`Does not use auth when there's no token present`, () => {
      instance._post(fakeUrl);
      assert.notOk(authSpy.calledOnce);
    });

    it('Sends the given payload', () => {
      instance._post(fakeUrl, fakePayload);
      assert.ok(sendSpy.calledWith(fakePayload));
    });

    it(`Has it's callback called when the request ends`, () => {
      instance._post(fakeUrl, fakePayload, fakeCallback);
      assert.ok(endSpy.calledWith(fakeCallback));
    });
  });

  describe('_put', () => {
    it(`PUTs to the given URL`, () => {
      instance._put(fakeUrl);
      assert.ok(superagent.put.calledOnce);
      assert.ok(superagent.put.calledWith(fakeUrl));
    });

    it(`Sets authentication when a token is present`, () => {
      instance.setToken(fakeToken);
      instance._post(fakeUrl);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it(`Does not use auth when there's no token present`, () => {
      instance._post(fakeUrl);
      assert.notOk(authSpy.calledOnce);
    });

    it('Sends the given payload', () => {
      instance._post(fakeUrl, fakePayload);
      assert.ok(sendSpy.calledWith(fakePayload));
    });

    it(`Has it's callback called when the request ends`, () => {
      instance._post(fakeUrl, fakePayload, fakeCallback);
      assert.ok(endSpy.calledWith(fakeCallback));
    });
  });

  describe('_del', () => {
    it(`DELETEs at the given URL`, () => {
      instance._del(fakeUrl);
      assert.ok(superagent.del.calledOnce);
      assert.ok(superagent.del.calledWith(fakeUrl));
    });

    it(`Sets authentication when a token is present`, () => {
      instance.setToken(fakeToken);
      instance._post(fakeUrl);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it(`Does not use auth when there's no token present`, () => {
      instance._post(fakeUrl);
      assert.notOk(authSpy.calledOnce);
    });

    it(`Has it's callback called when the request ends`, () => {
      instance._post(fakeUrl, fakePayload, fakeCallback);
      assert.ok(endSpy.calledWith(fakeCallback));
    });
  });
});
