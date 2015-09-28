import pactMethod from '../modules/pactMethod';

describe('pactMethod', () => {
  it('Only works when used from a PactResource instance', () => {
    assert.throws(() => {
      const shouldBreak = pactMethod({});
      shouldBreak();
    });
  });

  it('Returns a function that performs a request on it\'s PactResource parent', () => {
    const spy = sinon.spy();

    // This is what pactMethod expects to be on it's `this` value
    const mockPactResource = {
      _request: spy,
      path: 'testPath',
    };

    mockPactResource.mockMethod = pactMethod({});
    assert.isFunction(mockPactResource.mockMethod);

    mockPactResource.mockMethod();
    assert.ok(spy.called);
  });

  it('Accepts a "method" argument, setting the method used on the request', () => {
    const spy = sinon.spy();

    const mockPactResource = {
      _request: spy,
      path: 'testPath',
    };

    mockPactResource.mock = pactMethod({
      method: 'patch',
    });
    mockPactResource.mock();
    assert.ok(spy.calledWith('patch', 'testPath/'));
  });

  it('Accepts a relative "path" argument, building the correct URL', () => {
    const spy = sinon.spy();

    const mockPactResource = {
      _request: spy,
      path: 'testPath',
    };

    mockPactResource.mock = pactMethod({
      method: 'post',
      path: 'longer-path',
    });
    mockPactResource.mock();
    assert.ok(spy.calledWith(
      'post',
      'testPath/longer-path'
    ));
  });

  describe('"urlParams" argument', () => {
    it('Interpolates the required urlParam from the payload', () => {
      const spy = sinon.spy();

      const mockPactResource = {
        _request: spy,
        path: 'testPath',
      };

      mockPactResource.mock = pactMethod({
        method: 'get',
        path: '{id}',
        urlParams: ['id'],
      });
      mockPactResource.mock({id: 'testId'});
      assert.ok(spy.calledWith(
        'get',
        'testPath/testId'
      ));
    });

    it('Throws if a urlParam is requried but not passed in the payload', () => {
      const spy = sinon.spy();
      const mockPactResource = {
        _request: spy,
        path: 'testPath',
      };

      mockPactResource.mock = pactMethod({
        method: 'get',
        path: '{id}',
        urlParams: ['id'],
      });
      assert.throws(() => mockPactResource.mock({}));
    });

    it('Leaves the rest of the payload alone', () => {
      const spy = sinon.spy();
      const mockPactResource = {
        _request: spy,
        path: 'testPath',
      };

      mockPactResource.mock = pactMethod({
        method: 'post',
        path: '{id}',
        urlParams: ['id'],
      });
      mockPactResource.mock({id: 'testId', foo: 'bar'});
      assert.ok(spy.calledWith(
        'post',
        'testPath/testId',
        {foo: 'bar'}
      ));
    });
  });
});
