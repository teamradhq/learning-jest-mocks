import dependency from 'fs';

jest.mock('fs');
const fs = jest.mocked(dependency);

describe('fs.readFileSync', () => {
  it('should call the mock implementation', () => {
    expect.assertions(1);

    fs.readFileSync('a b c');
    fs.readFileSync('a b c');
    fs.readFileSync('a b c');

    expect(fs.readFileSync).toHaveBeenCalledTimes(3);
  });

  it('should call the mocked module method', () => {
    expect.assertions(1);

    fs.readFileSync('path', 'utf8');

    expect(fs.readFileSync).toHaveBeenCalledWith('path', 'utf8');
  });

  it('should provide empty file contents', () => {
    expect.assertions(1);

    const result = fs.readFileSync('path', 'utf8');

    expect(result).toBe('');
  });

  it('should provide the mocked file contents', () => {
    expect.assertions(1);

    fs.readFileSync.mockReturnValueOnce('a b c');
    const result = fs.readFileSync('path', 'utf8');

    expect(result).toBe('a b c');
  });
});
