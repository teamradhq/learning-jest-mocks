# Learning Jest Mocks

This collection contains a number of unit tests that demonstrate mocking in Jest. It can be used as a guide to learn
how to work with mocks when testing.

Setting up and running tests:

```bash
nvm use 18
npm install
npm run test
```

## Information

> Mock functions allow you to test the links between code by erasing the actual implementation of a function, capturing
> calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when
> instantiated with new, and allowing test-time configuration of return values.

There are two ways to mock functions:

Mocking can be done in two ways:

- Creating a mock function to use in test code
- Writing a manual mock to override a module dependency

### Mock Functions

A simple example of a mock function could be a function that accepts a callback function and some times to apply it to:

```typescript
function applyCallback<I, T>(items: I, callback: () => T): T[] {
  const results: T[] = [];

  for (let item of items) {
    results.push(callback(item));
  }

  return results;
}
```

We can define a mock function to use in our tests:

```typescript
const callback = jest.fn((item) => item * 2);

it('should call the callback function', () => {
  applyCallback([1, 2, 3], callback);

  expect(callback).toBeCalledTimes(3);
  expect(callback).toHaveBeenNthCalledWith(1, 1);
});
```

Additionally, mock function contain a `.mock` property which provides additional information about calls to the
function. For example, the previous assertions can be written as:

```typescript
expect(someMockFunction.mock.calls).toHaveLength(3)
expect(someMockFunction.mock.calls[0][0]).toBe(1);
```

We can also inject values into our tests:

```typescript
callback.mockReturnValueOnce('a').mockReturnValueOnce('b').mockReturnValue('c');

expect(applyCallback([1, 2, 3], callback)).toStrictEqual(['a', 'b', 'c']);
```

This is particularly useful when using a functional continuation passing style:

```typescript
const filter = jest.fn();
filter.mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValue(true);

expect([1, 2, 3].filter(filter)).toStrictEqual([1, 3]);
```

### Mocking Modules

When we are testing code that uses some external modules, we can mock these modules to provide a controlled environment
with predictable results. If we are using `axios` to get some results from an API, for example:

```typescript
import axios from 'axios';

jest.mock('axios');

it('should get some results', async () => {
  const results = [{id: 1, name: 'Test'}];
  const response = {data: results};

  axios.get.mockResolvedValue(response);

  expect(await axios.get('/api/results')).toStrictEqual(results);
});
```

## Manual Mocks

Alternatively, data can be stubbed out using manual mocks. These enable mocks to be reused across multiple tests. Manual
mocks are placed in a `__mocks__` directory adjacent to the module that is being mocked.

```shell
|-src
  |-__mocks__
    |-module.ts
  |-module.ts
|-node_modules
|-__mocks__
  |-fs.ts
  |-axios.ts
```

When we mock user modules, we must explicitly call `jest.mock` for each module we're importing into our tests:

```typescript
import {user} from './user';

jest.mock('./user');
```

The same is true when we mock node modules:

```typescript
import * as fs from 'fs';

jest.mock('fs');
```

### Writing a Manual Mock

Mocking a module is relatively easy. Say we want to mock the `fs` module to avoid disk writes:

```typescript
import * as path from 'path';

const fs = jest.createMockFromModule('fs');

/**
 * Provide a utility to mock file reads.
 */
let mockFiles = Object.create(null);

function __setMockFiles(newMockFiles: Record<string, string>) {
  mockFiles = Object.create(null);

  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }

    mockFiles[dir].push(path.basename(file));
  }
}

/**
 * Mock the readdirSync function.
 *
 * @param directoryPath
 */
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;

export default fs;
```

We can then use this mock in our tests:

```typescript
import * as fs from 'fs';

jest.mock('fs');

const MOCK_FILE_INFO = {
  '/path/to/file1.json': 'file1 contents',
  '/path/to/file2.json': 'file2 contents',
};

beforeEach(() => {
  fs.__setMockFiles(MOCK_FILE_INFO);
});


expect(fs.readdirSync('test')).toHaveLength(2);
```

You can use `jest.createMockFromModule` to automatically mock a module. But this optional, as you can define all of
the functions yourself if this is more convenient. The only caveat is that you'll have to mock the entire module.

Another useful feature is to keep the mock in sync with the real module using `jest.requireActualModule(moduleName)`.

## Examples

### Creating mock functions

See: [lib/applyCallback.test.ts](lib/applyCallback.test.ts)

This test suite tests that a callback function is called by providing a Jest mock function.

### Automatically mocking user modules

See: [lib/applyCallbackToItems.test.ts](lib/applyCallbackToItems.test.ts)

This test suite mocks a module using `jest.mock` and `jest.mocked`. The tests assert that the module being
tested is calling the module that's been mocked.

### Manually mocking user modules

See: [lib/manual.test.ts](lib/manual.test.ts)

This test suite demonstrates manually mocking a user module by defining a `lib/__mocks__/manual` module.

### Manually mocking node modules

See: [lib/module.fs.test.ts](lib/module.fs.test.ts)

This test suite demonstrates manually mocking a node module by defining a `__mocks__/fs` module. This

## References

- [Jest Mock Functions](https://jestjs.io/docs/mock-functions)
- [Jest Manual Mocks](https://jestjs.io/docs/manual-mocks)
