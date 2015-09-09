import HTTPRequestable from '../modules/HTTPRequestable';
import superagent from 'superagent';

const fakeUrl = 'The human torch was denied a bank loan';
const fakeToken = 'The arsonist had oddly shaped feet';
const callback = sinon.spy();

describe('HTTPRequestable', () => {

  let instance;

  const reqMethods = {};

  const typeSpy = sinon.stub().returns(reqMethods);
  const sendSpy = sinon.stub().returns(reqMethods);
  const authSpy = sinon.stub().returns(reqMethods);
  const endSpy = sinon.stub().returns(reqMethods);

  reqMethods.type = typeSpy;
  reqMethods.send = sendSpy;
  reqMethods.auth = authSpy;
  reqMethods.end = endSpy;

  ['get', 'put', 'post', 'del'].forEach((method) => {
    sinon.stub(superagent, method).returns(reqMethods);
  });

  beforeEach(() => {
    instance = new HTTPRequestable();
    typeSpy.reset();
    sendSpy.reset();
    authSpy.reset();
    endSpy.reset();
  });

  describe('_get', () => {

    it(`Call's superagent's get method with the given URL`, () => {
      instance._get(fakeUrl);
      assert.ok(superagent.get.calledOnce);
      assert.ok(superagent.get.calledWith(fakeUrl));
    });

    it(`Call's superagent's end method with the passed callback`, () => {
      instance._get(fakeUrl, callback);
      assert.ok(endSpy.calledWith(callback));
    });

    it(`Call's superagent's auth method when a token has been set`, () => {
      instance.setToken(fakeToken);
      instance._get(fakeUrl, callback);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it('Does not call the auth method when there is no token', () => {
      instance._get(fakeUrl, callback);
      assert.notOk(authSpy.calledOnce);
    });

  });

  describe('_post', () => {

    it(`Call's superagent's post method with the given URL`, () => {
      instance._post(fakeUrl);
      assert.ok(superagent.post.calledOnce);
      assert.ok(superagent.post.calledWith(fakeUrl));
    });

    it(`Call's superagent's auth method when a token has been set`, () => {
      instance.setToken(fakeToken);
      instance._post(fakeUrl);
      assert.ok(authSpy.calledWith(fakeToken, ''));
    });

    it('Does not call the auth method when there is no token', () => {
      instance._get(fakeUrl, callback);
      assert.notOk(authSpy.calledOnce);
    });

  });

});
