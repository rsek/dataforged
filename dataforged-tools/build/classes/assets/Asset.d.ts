import { AssetAbility } from "./AssetAbility.js";
import { ConditionMeter } from "../common/ConditionMeter.js";
import type { Input } from "../common/Input.js";
import { SourceInheritor } from "../common/SourceInheritor.js";
import type { IAssetState } from "../../json_out/assets/IAssetState.js";
import type { IAssetUsage } from "../../json_out/assets/IAssetUsage.js";
import type { Gamespace } from "../../json_out/common/Gamespace.js";
import { InputType } from "../../json_out/common/index.js";
import type { AssetId, IAsset, IAssetAttachment, IAssetType, RequireKey } from "../../json_out/index.js";
import type { IDisplay, ISource } from "../../json_out/meta/index.js";
import type { IAssetYaml } from "../../yaml_in/assets/index.js";
/**
 * @internal
 */
export declare class Asset extends SourceInheritor implements IAsset {
    $id: AssetId;
    Name: string;
    States?: IAssetState[] | undefined;
    Aliases?: string[] | undefined;
    "Asset Type": IAssetType["$id"];
    Display: RequireKey<IDisplay, "Color">;
    Usage: IAssetUsage;
    Attachments?: IAssetAttachment | undefined;
    Requirement?: string | undefined;
    Inputs?: Input<InputType>[] | undefined;
    Abilities: [AssetAbility, AssetAbility, AssetAbility];
    "Condition Meter"?: ConditionMeter | undefined;
    constructor(json: IAssetYaml, gamespace: Gamespace, parent: IAssetType, rootSource: ISource);
}
//# sourceMappingURL=Asset.d.ts.map