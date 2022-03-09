/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
export default function lengthOfLongest<T extends {length: number}>(array: Array<T>): number {
  return array.map(item =>  item.length).reduce((a, b) => a > b ? a : b);
}