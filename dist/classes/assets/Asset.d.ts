import { AssetAbility } from "../../../dist/classes/assets/AssetAbility.js";
import { ConditionMeter } from "../../../dist/classes/common/ConditionMeter.js";
import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import type { AssetId, AssetTypeId, FragmentString, IAsset, IAssetAttachment, IAssetInput, IAssetType, IDisplay } from "../../../dist/json_out/index.js";
import type { RequireKey } from "../../../dist/utils/types/RequireKey.js";
import type { Tuple } from "../../../dist/utils/types/Tuple.js";
import type { IAssetYaml } from "../../../dist/yaml_in/index.js";
export declare class Asset extends SourceInheritor implements IAsset {
    $id: AssetId;
    Name: string;
    Aliases?: string[] | undefined;
    "Asset Type": AssetTypeId;
    Display: RequireKey<IDisplay, "Color">;
    Attachments?: IAssetAttachment | undefined;
    Inputs?: IAssetInput[] | undefined;
    Requirement?: FragmentString | undefined;
    Abilities: Tuple<AssetAbility, 3>;
    "Condition Meter"?: ConditionMeter | undefined;
    constructor(json: IAssetYaml, parent: IAssetType);
}
//# sourceMappingURL=Asset.d.ts.map