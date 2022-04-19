"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idToHref = void 0;
const findById_js_1 = require("./findById.js");
/**
 * Converts an game item's ID string into a hyperlink-friendly relative URL.
 * @param id - The id of the item you want to link to.
 * @param data - The data to search through.
 * @returns A string that can be used as a URL.
 */
function idToHref(id, data) {
    const item = (0, findById_js_1.findById)(data, id);
    if (!item) {
        throw new Error(`Unable to find id: ${id}`);
    }
    let newId = id;
    if (item.Display) {
        const splitId = newId.split("/");
        newId = splitId.slice(0, -1).join("/") + "/" + item.Display.Title;
    }
    return newId
        .replaceAll(" ", "_");
}
exports.idToHref = idToHref;
//# sourceMappingURL=idToHref.js.map