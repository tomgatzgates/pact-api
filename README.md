PactAPI
=======

> A JS wrapper around Pact's APIs to make it faster and easier to use in client/server JS projects.

Each async method returns a [promise](http://www.html5rocks.com/en/tutorials/es6/promises/).


Usage
=====

**This project currently requires the use of a module build tool like browserify or webpack**. The output `dist` is simply babel transformed code to ES5. In future this could be a completely packaged dist.

### Constructor `new PactAPI(base, ?token)`

- `base` is the URL of the API
- `token` is an optional authentication token

### `setBase(newBase)`

Set the base URL to the given base.

### `setToken(token)`

Set the auth token on the instance. **Note:** On `login`, the instance will automatically set the token.

### `login(email, password).then({token}, err)`

Login to the API, returning the auth token. This method automatically calls `setToken` on the instance, authenticating future calls.

### `logout().then(response, err)`

Log out of the API using the currently-set auth token


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
