import type IAsset from "./IAsset.js";
import type IDisplay from "../../general/IDisplay.js";
import type IRules from "../../general/IRules.js";
import type { ParagraphsString } from "../../general/StringTypes.js";
import type AssetTypeId from "../AssetTypeId.js";
import type AssetTypeName from "../AssetTypeName.js";
import type { WithRequired } from "../WithRequired.js";


export interface IAssetType extends IRules {
  $id?: AssetTypeId | undefined;
  Name: AssetTypeName;
  Description: ParagraphsString;
  Assets: IAsset[];
  Display: WithRequired<IDisplay, "Color">;
}
