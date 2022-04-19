"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortIronsworn = void 0;
const index_js_1 = require("../json_out/index.js");
const order = [
    index_js_1.SourceTitle.Starforged,
    index_js_1.SourceTitle.StarforgedAssets,
    index_js_1.SourceTitle.Ironsworn,
    index_js_1.SourceTitle.IronswornAssets,
    index_js_1.SourceTitle.IronswornDelve,
    index_js_1.SourceTitle.IronswornBonusAssets
];
/**
 * Sort comparison function for Ironsworn source data.
 * @param source1 - The first source to compare.
 * @param source2 - The second source to compare
 */
function sortIronsworn(source1, source2) {
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
exports.sortIronsworn = sortIronsworn;
//# sourceMappingURL=sortIronsworn.js.map