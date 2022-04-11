import { AssetAbility } from "./AssetAbility.js";
import { ConditionMeter, SourceInheritor } from "../common/index.js";
import type { AssetId, IAsset, IAssetAttachment, IAssetInput, IAssetType, RequireKey, Tuple } from "../../json_out/assets/index.js";
import type { IDisplay } from "../../json_out/meta/index.js";
import type { IAssetYaml } from "../../yaml_in/assets/index.js";
/**
 * @internal
 */
export declare class Asset extends SourceInheritor implements IAsset {
    $id: AssetId;
    Name: string;
    Aliases?: string[] | undefined;
    "Asset Type": IAssetType["$id"];
    Display: RequireKey<IDisplay, "Color">;
    Attachments?: IAssetAttachment | undefined;
    Inputs?: IAssetInput[] | undefined;
    Requirement?: string | undefined;
    Abilities: Tuple<AssetAbility, 3>;
    "Condition Meter"?: ConditionMeter | undefined;
    constructor(json: IAssetYaml, parent: IAssetType);
}
//# sourceMappingURL=Asset.d.ts.map