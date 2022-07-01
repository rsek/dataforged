//License: MIT
import type { IOracleCategory } from "@json_out/index.js";
import FolderData from "@league-of-foundry-developers/foundry-vtt-types";
import type { FolderDataConstructorData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/folderData";

export function oracleCatToFolder(oracleCat: IOracleCategory, parentCat?: Folder | undefined) {
  const data: FolderDataConstructorData = {
    name: oracleCat.Name,
    type: "RollTable",
    description: oracleCat.Description
  };
  const folder = new Folder(data);
  return folder;
}