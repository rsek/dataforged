// FIXME: could probably be done with lodash's zip instead

export function transpose2dArray<T> (array: T[][]) {
  const output = array[0].map((_, colIndex) => array.map(row => row[colIndex]))
  return output
}
