import type { IAlterMove } from "@dataforged/interfaces/json_out/assets/IAlterMove.js";
import type { IAsset } from "@dataforged/interfaces/json_out/assets/IAsset.js";
import type { IAssetInput } from "@dataforged/interfaces/json_out/assets/IAssetInput.js";
import type { IHasId, IHasText } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { IMove } from "@dataforged/interfaces/json_out/moves/IMove.js";
import type { AssetAbilityId } from "@dataforged/strings/id/AssetAbilityId.js";

export interface IAssetAbility extends IHasId<AssetAbilityId>, IHasText {
  Moves?: IMove[] | undefined;
  Inputs?: IAssetInput[] | undefined;
  "Alter Moves"?: IAlterMove[] | undefined;
  "Alter Properties"?: Partial<IAsset> | undefined;
  Enabled: boolean;
}
