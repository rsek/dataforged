import type AssetTypeName from "@dataforged/constants/AssetTypeName.js";
import type IAsset from "@dataforged/interfaces/json_out/assets/IAsset.js";
import type IDisplay from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type { IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource } from "@dataforged/interfaces/json_out/common/IHas.js";
import type AssetTypeId from "@dataforged/strings/id/AssetTypeId.js";
import type { RequireKey } from "@dataforged/utils/types/RequireKey.js";

export default interface IAssetType extends IHasId<AssetTypeId>, IHasName<AssetTypeName>, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">>, IHasSource, Partial<IHasAliases>{
  Assets: IAsset[];
}
