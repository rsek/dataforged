import _ from "lodash";
import { stringify } from "querystring";
const stats = ["Edge", "Iron", "Heart", "Shadow", "Wits"]

export function uniquePairs<T>(...items: Array<T>) {
  let allPairs: Array<[T, T]> = [];
  items.forEach(item1 => items.forEach(item2 => {
    if (item1 != item2) {
      let newPair = new Array(item1, item2).sort() as [T, T];
      let matchingPairs = allPairs.some((oldPair) =>
        oldPair.every((item, index) => item == newPair[index])
      );
      if (matchingPairs === false) {
        // if (matchingPairs.length == 0) {
        allPairs.push(newPair);
      }
    }
  }));
  return allPairs;
}

export function uniqueStatArrays() {
  const statPairs = uniquePairs(...stats);
  const statTriads: Array<[string, [string, string]]> = [];
  statPairs.forEach(pair => {
    stats.forEach(stat => {
      if (!pair.includes(stat)) {
        statTriads.push([stat, pair]);
      }

    })

  });
  return statTriads.sort().map(triad => {
    let statRecord: Record<string, number> = {};
    statRecord[triad[0]] = 3;
    statRecord[triad[1][0]] = 2;
    statRecord[triad[1][1]] = 2;
  });
}


console.log(uniqueStatArrays());