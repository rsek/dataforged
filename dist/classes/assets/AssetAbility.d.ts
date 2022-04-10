import { AlterMove, Move } from "../index.js";
import type { AssetAbilityId, IAsset, IAssetAbility, IAssetInput, ParagraphsString } from "../../json_out/index.js";
import type { IAssetAbilityYaml } from "../../yaml_in/index.js";
export declare class AssetAbility implements IAssetAbility {
    $id: AssetAbilityId;
    Text: ParagraphsString;
    Moves?: Move[] | undefined;
    Inputs?: IAssetInput[] | undefined;
    "Alter Moves"?: AlterMove[] | undefined;
    "Alter Properties"?: Partial<IAsset> | undefined;
    Enabled: boolean;
    constructor(json: IAssetAbilityYaml, id: AssetAbilityId, parent: IAsset);
}
//# sourceMappingURL=AssetAbility.d.ts.map