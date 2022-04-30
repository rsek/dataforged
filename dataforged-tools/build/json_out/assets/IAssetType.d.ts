import type { AssetTypeName } from "./AssetTypeName.js";
import type { Gamespace } from "../common/Gamespace.js";
import type { IAsset, IDisplayWithTitle, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource } from "../index.js";
export * from "../../utils/types/RequireKey.js";
/**
 * @public
 */
export declare enum AssetTypeIdFragment {
    Command_Vehicle = "Command_Vehicle",
    Companion = "Companion",
    Deed = "Deed",
    Module = "Module",
    Path = "Path",
    Support_Vehicle = "Support_Vehicle"
}
/**
 * @internal
 * @asType string
 */
export declare type AssetTypeId = `${Gamespace}/${AssetTypeIdBase}`;
/**
 * @internal
 * @asType string
 */
export declare type AssetTypeIdBase = `Assets/${AssetTypeIdFragment}`;
/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export interface IAssetType extends IHasName, IHasId, IHasDescription, IHasDisplay, IHasSource, Partial<IHasAliases> {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+$
     */
    $id: string;
    /**
     * The assets that belong to this asset type.
     */
    Assets: IAsset[];
    Name: AssetTypeName;
    Display: IDisplayWithTitle;
}
//# sourceMappingURL=IAssetType.d.ts.map