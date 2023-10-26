export function filterDifferentKeys(
  first: Record<string, any>,
  second: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in first) {
    if (first[key] !== second[key]) {
      result[key] = first[key];
    }
  }
  return result;
}
