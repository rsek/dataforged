import type { IAssetUsage } from "./IAssetUsage.js";
import type { IAsset, IDisplayWithTitle, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName, IHasSource, IHasTitle, ITitle } from "../index.js";
export * from "../../utils/types/RequireKey.js";
/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export interface IAssetType extends Partial<IHasName>, IHasId, IHasDescription, IHasDisplay, IHasSource, IHasTitle, Partial<IHasAliases> {
    /**
     * @example "Ironsworn/Assets/Ritual"
     * @example "Starforged/Assets/Command_Vehicle"
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+$
     */
    $id: string;
    /**
     * The assets that belong to this asset type.
     */
    Assets: IAsset[];
    /**
     * @example "Ritual"
     * @example "Command Vehicle"
     * @localize
     */
    Title: ITitle;
    /**
     * @deprecated Use {@link IAssetType.Title} instead
     */
    Name?: string | undefined;
    Display: IDisplayWithTitle;
    Usage: IAssetUsage;
}
//# sourceMappingURL=IAssetType.d.ts.map