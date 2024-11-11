export function forEach(items: string[], callback: (item: string) => void) {
  for (const item of items) {
    callback(item);
  }
}
