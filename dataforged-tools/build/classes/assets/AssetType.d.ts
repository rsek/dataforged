import { Asset, SourceInheritor } from "../index.js";
import type { Gamespace, IAssetType, IAssetUsage, IDisplayWithTitle, ISource } from "../../json_out/index.js";
import type { IAssetTypeYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class AssetType extends SourceInheritor implements IAssetType {
    $id: IAssetType["$id"];
    Name: string;
    Aliases?: string[] | undefined;
    Description: string;
    Assets: Asset[];
    Display: IDisplayWithTitle;
    Usage: IAssetUsage;
    constructor(json: IAssetTypeYaml, gamespace: Gamespace, rootSource: ISource);
}
//# sourceMappingURL=AssetType.d.ts.map