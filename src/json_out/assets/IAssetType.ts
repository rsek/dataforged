import type { AssetTypeName } from "@dataforged/json_out/assets/AssetTypeName.js";
import type { AssetTypeId , IAsset , IDisplay, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName , IHasSource } from "@dataforged/json_out/index.js";
import type { RequireKey } from "@dataforged/utils/types/RequireKey.js";

export * from "@dataforged/utils/types/RequireKey.js";

export interface IAssetType extends IHasId<AssetTypeId>, IHasName<AssetTypeName>, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">>, IHasSource, Partial<IHasAliases>{
  Assets: IAsset[];
}