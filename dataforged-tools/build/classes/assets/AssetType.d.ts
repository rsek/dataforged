import { Asset, SourceInheritor, Title } from "../index.js";
import type { Gamespace, IAssetType, IAssetUsage, IDisplay, ISource } from "../../json_out/index.js";
import type { IAssetTypeYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class AssetType extends SourceInheritor implements IAssetType {
    $id: IAssetType["$id"];
    Title: Title;
    Aliases?: string[] | undefined;
    Description: string;
    Assets: Asset[];
    Display: IDisplay;
    Usage: IAssetUsage;
    constructor(json: IAssetTypeYaml, gamespace: Gamespace, rootSource: ISource);
}
//# sourceMappingURL=AssetType.d.ts.map