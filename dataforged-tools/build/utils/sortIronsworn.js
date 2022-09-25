import { SourceTitle } from "../schema";
const order = [
    SourceTitle.Starforged,
    SourceTitle.StarforgedAssets,
    SourceTitle.Ironsworn,
    SourceTitle.IronswornAssets,
    SourceTitle.IronswornDelve,
];
/**
 * Sort comparison function for Ironsworn source data.
 * @param source1 - The first source to compare.
 * @param source2 - The second source to compare
 */
export function sortIronsworn(source1, source2) {
    if (source1.Title !== source2.Title) {
        return order.findIndex(src => src === source1.Title) - order.findIndex(src => src === source2.Title);
    }
    else if (source1.Page && source2.Page) {
        return source1.Page - source2.Page;
    }
    else if (source1.Page || source2.Page) {
        // empty page vs specified page defaults to last
        if (!source1.Page) {
            return 1;
        }
        if (!source2.Page) {
            return -1;
        }
    }
    return 0;
}
//# sourceMappingURL=sortIronsworn.js.map