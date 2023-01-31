import * as manual from './manual';

jest.mock('./manual');


describe('lib.manual', () => {
  it('should get the manually mocked value for manual.get', () => {
    expect.assertions(1);

    const result = manual.get('a b c');

    expect(result).toStrictEqual(['a', 'b', 'c']);
  });

  it('should put the manually mocked value for manual.put', () => {
    expect.assertions(1);

    const result = manual.put(['a', 'b', 'c']);

    expect(result).toBe('a b c');
  });

  it('should provide a value to manual.get', () => {
    expect.assertions(1);

    manual.get('a b c');

    expect(manual.get).toHaveBeenCalledWith('a b c');
  });

  it('should provide a value to manual.put', () => {
    expect.assertions(1);

    manual.put(['a', 'b', 'c']);

    expect(manual.put).toHaveBeenCalledWith(['a', 'b', 'c']);
  });
});
