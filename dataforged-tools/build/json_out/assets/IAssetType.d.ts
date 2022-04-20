import type { AssetTypeName } from "./AssetTypeName.js";
import type { Gamespace } from "../common/Gamespace.js";
import type { IAsset, IDisplay, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource } from "../index.js";
import type { RequireKey } from "../../utils/types/RequireKey.js";
export * from "../../utils/types/RequireKey.js";
/**
 * @public
 */
export declare type AssetTypeIdFragment = "Command_Vehicle" | "Companion" | "Deed" | "Module" | "Path" | "Support_Vehicle";
/**
 * @public
 */
export declare type AssetTypeId = `${Gamespace}/${AssetTypeIdBase}`;
/**
 * @public
 */
export declare type AssetTypeIdBase = `Assets/${AssetTypeIdFragment}`;
/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export interface IAssetType extends IHasName, IHasId<AssetTypeId>, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">>, IHasSource, Partial<IHasAliases> {
    /**
     * The assets that belong to this asset type.
     */
    Assets: IAsset[];
    Name: AssetTypeName;
}
//# sourceMappingURL=IAssetType.d.ts.map