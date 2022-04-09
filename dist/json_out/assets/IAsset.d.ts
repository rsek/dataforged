import type { AssetId, AssetTypeId, FragmentString, IAssetAbility, IAssetAttachment, IAssetInput, IConditionMeter, IHasAliases, IHasDisplay, IHasId, IHasName, IHasSource } from "@dataforged/json_out/index.js";
import type { Tuple } from "../../../dist/utils/types/Tuple.js";
export * from "../../../dist/utils/types/Tuple.js";
export interface IAsset extends IHasId<AssetId>, IHasName, IHasDisplay, IHasSource, Partial<IHasAliases> {
    $id: AssetId;
    Name: string;
    "Asset Type": AssetTypeId;
    Attachments?: IAssetAttachment | undefined;
    Inputs?: IAssetInput[] | undefined;
    Requirement?: FragmentString | undefined;
    Abilities: Tuple<IAssetAbility, 3>;
    "Condition Meter"?: IConditionMeter | undefined;
}
//# sourceMappingURL=IAsset.d.ts.map