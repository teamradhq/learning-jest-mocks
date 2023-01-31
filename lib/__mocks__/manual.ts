export const get = jest.fn(function get(tags: string): string[] {
  return ['a', 'b', 'c'];
});

export const put = jest.fn(function put(tags: string[]): string {
  return 'a b c';
});
