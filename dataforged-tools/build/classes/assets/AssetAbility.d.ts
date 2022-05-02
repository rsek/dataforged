import type { InputClock, InputNumber, InputText } from "../common/Input.js";
import { AlterMove, Move } from "../index.js";
import type { Gamespace, IAlterMomentum, IAsset, IAssetAbility } from "../../json_out/index.js";
import type { IAssetAbilityYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class AssetAbility implements IAssetAbility {
    $id: IAssetAbility["$id"];
    Text: string;
    Moves?: Move[] | undefined;
    Inputs?: (InputNumber | InputClock | InputText)[] | undefined;
    "Alter Moves"?: AlterMove[] | undefined;
    "Alter Properties"?: IAssetAbility["Alter Properties"] | undefined;
    "Alter Momentum"?: IAlterMomentum | undefined;
    Enabled: boolean;
    constructor(json: IAssetAbilityYaml, id: IAssetAbility["$id"], gamespace: Gamespace, parent: IAsset);
}
//# sourceMappingURL=AssetAbility.d.ts.map