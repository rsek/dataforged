import { AssetAbility } from "./AssetAbility.js";
import { AssetState } from "./AssetState.js";
import { ConditionMeter } from "../common/ConditionMeter.js";
import type { InputText } from "../common/Input.js";
import type { InputSelect } from "../common/InputSelect.js";
import { SourceInheritor } from "../common/SourceInheritor.js";
import type { Gamespace, IAsset, IAssetAttachment, IAssetType, IAssetUsage, IDisplayWithTitle, ISource } from "../../json_out/index.js";
import type { IAssetYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class Asset extends SourceInheritor implements IAsset {
    $id: IAsset["$id"];
    Name: string;
    States?: AssetState[] | undefined;
    Aliases?: string[] | undefined;
    "Asset Type": IAssetType["$id"];
    Display: IDisplayWithTitle;
    Usage: IAssetUsage;
    Attachments?: IAssetAttachment | undefined;
    Requirement?: string | undefined;
    Inputs?: (InputText | InputSelect)[] | undefined;
    Abilities: [AssetAbility, AssetAbility, AssetAbility];
    "Condition Meter"?: ConditionMeter | undefined;
    constructor(json: IAssetYaml, gamespace: Gamespace, parent: IAssetType, rootSource: ISource);
}
//# sourceMappingURL=Asset.d.ts.map