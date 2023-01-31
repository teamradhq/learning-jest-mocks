import { applyCallbackToItems } from './applyCallbackToItems';
import { applyCallback } from './applyCallback';

jest.mock<typeof import('./applyCallback')>('./applyCallback', () => ({
  applyCallback: jest.fn(),
}));

const mockApplyCallback = jest.mocked(applyCallback);
const callback = jest.fn();

describe('lib.applyCallbackToItems', () => {
  it('should apply callback to each item', () => {
    expect.assertions(1);

    applyCallbackToItems(callback, [1, 2, 3]);

    expect(mockApplyCallback).toHaveBeenCalledTimes(3);
  });

  it('should mock the return value of a callback', () => {
    expect.assertions(1);

    mockApplyCallback.mockReturnValueOnce(20)
      .mockReturnValueOnce(30)
      .mockReturnValueOnce(40);

    const result = applyCallbackToItems(callback, [1, 2, 3]);

    expect(result).toStrictEqual([20, 30, 40]);
  });
});
