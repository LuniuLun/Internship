export function forEach(items: number[], callback: (item: number) => void) {
  for (const item of items) {
    callback(item);
  }
}
