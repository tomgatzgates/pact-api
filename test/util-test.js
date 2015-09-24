import {
  makeURLInterpolator
} from '../modules/util';

describe('util', () => {
  describe('makeURLInterpolator', () => {
    it('Interpolates values into a prepared template', () => {
      const template = makeURLInterpolator('/some/url/{foo}/{baz}?ok=1');

      assert.equal(
        template({
          foo: 1,
          baz: 2
        }), '/some/url/1/2?ok=1');

      assert.equal(
        template({
          foo: '',
          baz: ''
        }),'/some/url//?ok=1');

      assert.equal(
        template({
          foo: 'FOO',
          baz: '__::baz::__'
        }), '/some/url/FOO/__%3A%3Abaz%3A%3A__?ok=1');

    });
  });
});
