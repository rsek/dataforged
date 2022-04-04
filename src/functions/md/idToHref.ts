import findById from "./findById.js";
import type IDisplay from "../../types/general/IDisplay.js";


export function idToHref(id: string, data: unknown) {
  const item = findById<{ Display?: IDisplay; }>(data, id);
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
