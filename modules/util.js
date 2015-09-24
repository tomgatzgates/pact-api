/**
 * https://gist.github.com/padolsey/6008842
 * Outputs a new function with interpolated object property values.
 * Use like so:
 *   const fn = makeURLInterpolator('some/url/{param1}/{param2}');
 *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
 */
export const makeURLInterpolator = (function() { // eslint-disable-line
  const rc = {
    '\n': '\\n',
    '\"': '\\\"',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029',
  };
  return function makeURLInterpolator(str) { // eslint-disable-line
    return new Function( // eslint-disable-line
      'o',
      'return "' + (
        str
        .replace(/["\n\r\u2028\u2029]/g, function($0) { // eslint-disable-line
          return rc[$0];
        })
        .replace(/\{([\s\S]+?)\}/g, '" + encodeURIComponent(o["$1"]) + "')
      ) + '";'
    );
  };
}());
