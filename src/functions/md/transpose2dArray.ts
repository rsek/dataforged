export default function transpose2dArray(array: any[][]) {
  let output = array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  return output;
}