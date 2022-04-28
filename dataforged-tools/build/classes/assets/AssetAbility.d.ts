import type { Input } from "../common/Input.js";
import { AlterMove, Move } from "../index.js";
import type { Gamespace } from "../../json_out/common/Gamespace.js";
import type { AssetAbilityId, IAlterMomentum, IAsset, IAssetAbility, InputType } from "../../json_out/index.js";
import type { IAssetAbilityYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class AssetAbility implements IAssetAbility {
    $id: AssetAbilityId;
    Text: string;
    Moves?: Move[] | undefined;
    Inputs?: Input<InputType>[] | undefined;
    "Alter Moves"?: AlterMove[] | undefined;
    "Alter Properties"?: Partial<IAsset> | undefined;
    "Alter Momentum"?: IAlterMomentum | undefined;
    Enabled: boolean;
    constructor(json: IAssetAbilityYaml, id: AssetAbilityId, gamespace: Gamespace, parent: IAsset);
}
//# sourceMappingURL=AssetAbility.d.ts.map