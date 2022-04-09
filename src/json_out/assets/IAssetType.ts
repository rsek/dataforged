import type { AssetTypeName } from "@json_out/assets/AssetTypeName.js";
import type { AssetTypeId , IAsset , IDisplay, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName , IHasSource } from "@json_out/index.js";
import type { RequireKey } from "@utils/types/RequireKey.js";

export * from "@utils/types/RequireKey.js";

export interface IAssetType extends IHasId<AssetTypeId>, IHasName<AssetTypeName>, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">>, IHasSource, Partial<IHasAliases>{
  Assets: IAsset[];
}