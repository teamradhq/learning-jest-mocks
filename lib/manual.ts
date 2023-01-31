export function get(tags: string): string[] {
  return tags.split(' ');
}

export function put(tags: string[]): string {
  return tags.join(' ');
}
