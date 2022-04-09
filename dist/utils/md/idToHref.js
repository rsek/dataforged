import { findById } from "../../../dist/utils/md/findById.js";
export function idToHref(id, data) {
    const item = findById(data, id);
    if (!item) {
        throw new Error(`Unable to find id: ${id}`);
    }
    let newId = id;
    if (item.Display) {
        const splitId = newId.split(" / ");
        newId = splitId.slice(0, -1).join("/") + "/" + item.Display.Title;
    }
    return newId
        .replaceAll(" ", "_");
}
//# sourceMappingURL=idToHref.js.map