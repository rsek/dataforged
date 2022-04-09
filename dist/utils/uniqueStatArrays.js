const stats = ["Edge", "Iron", "Heart", "Shadow", "Wits"];
export function uniquePairs(...items) {
    const allPairs = [];
    items.forEach(item1 => items.forEach(item2 => {
        if (item1 !== item2) {
            const newPair = [item1, item2].sort();
            const matchingPairs = allPairs.some((oldPair) => oldPair.every((item, index) => item === newPair[index]));
            if (matchingPairs === false) {
                allPairs.push(newPair);
            }
        }
    }));
    return allPairs;
}
export function uniqueStatArrays() {
    const statPairs = uniquePairs(...stats);
    const statTriads = [];
    statPairs.forEach(pair => {
        stats.forEach(stat => {
            if (!pair.includes(stat)) {
                statTriads.push([stat, pair]);
            }
        });
    });
    return statTriads.sort().map(triad => {
        const statRecord = {};
        statRecord[triad[0]] = 3;
        statRecord[triad[1][0]] = 2;
        statRecord[triad[1][1]] = 2;
    });
}
console.log(uniqueStatArrays());
//# sourceMappingURL=uniqueStatArrays.js.map