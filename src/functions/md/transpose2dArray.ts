export default function transpose2dArray<T>(array: T[][]) {
  const output = array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  return output;
}