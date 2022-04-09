import type { AssetAbilityId, IAlterMove, IAsset, IAssetInput, IHasId, IHasText, IMove } from "@dataforged/json_out/index.js";
export interface IAssetAbility extends IHasId<AssetAbilityId>, IHasText {
    Moves?: IMove[] | undefined;
    Inputs?: IAssetInput[] | undefined;
    "Alter Moves"?: IAlterMove[] | undefined;
    "Alter Properties"?: Partial<IAsset> | undefined;
    Enabled: boolean;
}
//# sourceMappingURL=IAssetAbility.d.ts.map