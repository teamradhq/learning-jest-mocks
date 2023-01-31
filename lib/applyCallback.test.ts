import { applyCallback } from './applyCallback';

const callback = jest.fn((value: number) => value + 1);

describe('lib.applyCallback', () => {
  it('should apply callback to a value', () => {
    expect.assertions(1);

    applyCallback(callback, 1);

    expect(callback).toHaveBeenCalledWith(1);
  });

  it('should mock the return value of a callback', () => {
    expect.assertions(1);

    callback.mockReturnValueOnce(20);
    const result = applyCallback(callback, 1);

    expect(result).toBe(20);
  });
});
