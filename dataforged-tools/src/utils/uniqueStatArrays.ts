const stats = [ "Edge", "Iron", "Heart", "Shadow", "Wits" ];

/**
 * Given an array of items, return an array of all unique pairs of items
 * @param items - An array of items to pair.
 * @returns An array of arrays.
 */
export function uniquePairs<T>(...items: Array<T>) {
  const allPairs: Array<[T, T]> = [];
  items.forEach(item1 => items.forEach(item2 => {
    if (item1 !== item2) {
      const newPair = [ item1, item2 ].sort() as [T, T];
      const matchingPairs = allPairs.some((oldPair) =>
        oldPair.every((item, index) => item === newPair[index])
      );
      if (matchingPairs === false) {
        // if (matchingPairs.length === 0) {
        allPairs.push(newPair);
      }
    }
  }));
  return allPairs;
}

/**
 * Given a list of stats, return a list of unique pairs of stats, and a list of unique triads of stats
 * @returns An array of objects, each of which has a statRecord property.
 */
export function uniqueStatArrays() {
  const statPairs = uniquePairs(...stats);
  const statTriads: Array<[string, [string, string]]> = [];
  statPairs.forEach(pair => {
    stats.forEach(stat => {
      if (!pair.includes(stat)) {
        statTriads.push([ stat, pair ]);
      }
    });
  });
  return statTriads.sort().map(triad => {
    const statRecord: Record<string, number> = {};
    statRecord[triad[0]] = 3;
    statRecord[triad[1][0]] = 2;
    statRecord[triad[1][1]] = 2;
  });
}

console.log(uniqueStatArrays());