import { SourceTitle } from "../schema";
const order = [
    SourceTitle.Starforged,
    SourceTitle.StarforgedAssets,
    SourceTitle.Ironsworn,
    SourceTitle.IronswornAssets,
    SourceTitle.IronswornDelve
];
/**
 * Sort comparison function for Ironsworn source data.
 * @param source1 - The first source to compare.
 * @param source2 - The second source to compare
 */
export function sortIronsworn(source1, source2) {
    if (source1.title !== source2.title) {
        return order.findIndex(src => src === source1.title) - order.findIndex(src => src === source2.title);
    }
    else if (source1.page && source2.page) {
        return source1.page - source2.page;
    }
    else if (source1.page || source2.page) {
        // empty page vs specified page defaults to last
        if (!source1.page) {
            return 1;
        }
        if (!source2.page) {
            return -1;
        }
    }
    return 0;
}
//# sourceMappingURL=sortIronsworn.js.map