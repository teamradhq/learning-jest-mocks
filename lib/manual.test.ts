import * as dependency from './manual';

jest.mock('./manual');
const manual = jest.mocked(dependency);

describe('lib.manual.get', () => {
  it('should provide the manually mocked value', () => {
    expect.assertions(1);

    const result = manual.get('a b c');

    expect(result).toStrictEqual(['a', 'b', 'c']);
  });

  it('should override the manually mocked value', () => {
    expect.assertions(1);

    manual.get.mockReturnValueOnce(['d', 'e', 'f']);
    const result = manual.get('a b c');

    expect(result).toStrictEqual(['d', 'e', 'f']);
  });

  it('should provide a value to manual.get', () => {
    expect.assertions(1);

    manual.get('a b c');

    expect(manual.get).toHaveBeenCalledWith('a b c');
  });
});

describe('lib.manual.put', () => {
  it('should provide the manually mocked value', () => {
    expect.assertions(1);

    const result = manual.put(['a', 'b', 'c']);

    expect(result).toBe('a b c');
  });

  it('should override the manually mocked value', () => {
    expect.assertions(1);

    manual.put.mockReturnValueOnce('d e f');
    const result = manual.put(['a', 'b', 'c']);

    expect(result).toBe('d e f');
  });

  it('should provide a value to manual.put', () => {
    expect.assertions(1);

    manual.put(['a', 'b', 'c']);

    expect(manual.put).toHaveBeenCalledWith(['a', 'b', 'c']);
  });
});
