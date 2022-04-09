import type { AssetTypeName } from "./AssetTypeName.js";
import type { AssetTypeId, IAsset, IDisplay, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource } from "../index.js";
import type { RequireKey } from "../../utils/types/RequireKey.js";
export * from "../../utils/types/RequireKey.js";
export interface IAssetType extends IHasId<AssetTypeId>, IHasName<AssetTypeName>, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">>, IHasSource, Partial<IHasAliases> {
    Assets: IAsset[];
}
//# sourceMappingURL=IAssetType.d.ts.map