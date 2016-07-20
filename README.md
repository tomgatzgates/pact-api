PactAPI
=======

> A JS wrapper around Pact's APIs to make it faster and easier to use in client/server JS projects.

Each async method returns a [promise](http://www.html5rocks.com/en/tutorials/es6/promises/).


Please note
-----------

**This project currently requires the use of a module build tool like browserify or webpack**. The output `dist` is simply babel transformed code to ES5. In future this could be a completely packaged dist.

API Usage
---------

Each resource can be access from your `pact-api` instance:

```js
import PactAPI from 'pact-api';

const pact = new PactAPI();
// pact.{RESOURCE_NAME}.{METHOD_NAME}
```

### Constructor `new PactAPI(?token, ?version, ?base)`

- `token`: optional token to auth requests with (default `undefined`)
- `version`: optional version of the API to hit (default `v1`)
- `base`: optinal base url used for requests (default `https://api.pactcoffee.com`)

### Handling reqests

Each method returns a promise:

```js
pact.tokens
  .create({email: 'hurr', password: 'durr'})
  .then(
    (body) => return pact.tokens.del(),
    (err) => throw new Error(error)
  );
```

### Available resources & methods

- token
  - `create()`
  - `del()`
- products
  - `list({queryParams})`
  - `listCoffees({queryParams})`
  - `listHardwares({queryParams})`
  - `retrieve(sku)`
- users
  - `create({params})`
  - `start()`
- addresses
  - `list()`
  - `create({params})`
  - `retrieve(id)`
  - `update({params})`
  - `del(id)`
- recurrables
  - `list()`
  - `create({params})`
  - `retrieve(id)`
  - `update({params})`
  - `del(id)`
- orders
  - `list()`
  - `create({params})`
  - `retrieve(id)`
  - `update({params})`
  - `del(id)`
- account
  - `fetch()`
- identities
  - `create({params})`
  - `update({params})`
- gifts
  - `create({params})`
- validate
  - `password({password})`
  - `address({params})`
  - `voucher({params})`


Running tests
-------------

`npm run test`


Contributing/Building
=====================

1. Fork
1. Make changes
1. `npm run build`
1. Commit changes
1. Appropriate version bump: `npm version major|minor|patch`
1. Open a PR
