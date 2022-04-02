import type IAsset from "./IAsset.js";
import type IDisplay from "../../general/IDisplay.js";
import type MdString from "../../general/MdString.js";
import type AssetTypeId from "../AssetTypeId.js";
import type AssetTypeName from "../AssetTypeName.js";
import type ICategoryBase from "../ICategoryBase.js";
import type { WithRequired } from "../WithRequired.js";


export interface IAssetType extends Partial<ICategoryBase> {
  $id?: AssetTypeId | undefined;
  Name: AssetTypeName;
  Description: MdString;
  Assets: IAsset[];
  Display: WithRequired<IDisplay, "Color">;
}
