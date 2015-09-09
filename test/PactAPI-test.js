import PactAPI from '../modules/PactAPI';

describe('PactAPI', () => {

  let instance;
  const fakeBase = 'Where did you get those clothes? At the toilet store?';
  const fakeToken = 'Dorothy Mantooth is a saint';

  beforeEach(() => {
    instance = new PactAPI();
  });

  describe('The constructor', () => {
    it('Can be passed a base URL', () => {
      assert.ok(new PactAPI(fakeBase).base === fakeBase);
    });
    it('Can be passed an auth token', () => {
      assert.ok(new PactAPI(fakeBase, fakeToken).token === fakeToken);
    });
  });

  describe('setBase', () => {
    it('Sets the base URL for all requests', () => {
      instance.setBase(fakeBase);
      assert.ok(instance.base === fakeBase);
    });

    it('Throws if called without a base', () => {
      assert['throws'](() => {
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

});
