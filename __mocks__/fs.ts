const fs = jest.createMockFromModule<typeof import('fs')>('fs');

fs.readFileSync = jest.fn((path, options) => '');

export default fs;
