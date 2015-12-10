import qs from 'qs';

import {makeURLInterpolator} from './util';
import methodTypes from './methodTypes';

function buildURL(base, path, queryObj) {
  let fullPath;
  if (Object.keys(queryObj).length) {
    const query = qs.stringify(queryObj, {
      arrayFormat: 'brackets',
      encode: false,
    });
    fullPath = `${base}${path ? '/' + path : ''}?${query}`;
  } else {
    fullPath = `${base}${path ? '/' + path : ''}`;
  }
  return fullPath;
}

// This fn to be used from inside a PactResource class/subclass only
export default function pactMethod({
  method = methodTypes.GET,
  path = '',
  urlParams = [],
  queryParams = [],
  payloadParams = [],
}) {
  const pathGenerator = makeURLInterpolator(path);

  return function makeRequest(payload = {}) {
    const urlData = {};
    const queryData = {};

    // Pull out query params from the payload
    queryParams.forEach(param => {
      const value = payload[param];

      if (typeof value !== 'undefined') {
        queryData[param] = value;
        delete payload[param];
      }
    });

    // Build the URL and check we have the required urlParams
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

    // Check if the payload contains the required payloadParams
    payloadParams.forEach(param => {
      const value = payload[param];
      if (typeof value === 'undefined') {
        throw new Error(
          `PactAPI: I require a payload containing "${param}"}`
        );
      }
    });

    const resourcePath = this.path;
    const fullPath = buildURL(resourcePath, pathGenerator(urlData), queryData);
    return this._request(method, fullPath, payload);
  };
}
