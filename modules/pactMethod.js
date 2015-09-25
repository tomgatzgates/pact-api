import {makeURLInterpolator} from './util';
import methodTypes from './methodTypes';

// This fn to be used from inside a PactResource class/subclass only
export default function pactMethod({
  method = methodTypes.GET,
  path = '',
  urlParams = [],
}) {
  const pathGenerator = makeURLInterpolator(path);

  return function makeRequest(payload) {
    const urlData = {};

    // Check to see if we have all the arguments we require
    urlParams.forEach(param => {
      const required = payload[param];
      if (typeof required === 'undefined' || required === null) {
        throw new Error(
          `PactAPI: I require argument "${param}", but I got: ${required}`
        );
      }

      // Add it to the url data
      urlData[param] = required;

      // Remove it from the payload
      delete payload[param];
    });

    const resourcePath = this.path;
    const fullPath = resourcePath + pathGenerator(urlData);
    return this._request(method, fullPath, payload);
  };
}
