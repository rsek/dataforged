export default function longestLength(array: string[]) {
  return array.reduce((a, b) => a.length > b.length ? a : b).length;
}