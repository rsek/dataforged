import type { IAssetAbility } from "../../json_out/index.js";
import type { StubBy } from "../../utils/types/Stub.js";
import type { IAlterMoveYaml } from "../index.js";
import type { IMoveYaml } from "../moves/IMoveYaml.js";
export interface IAssetAbilityYaml extends StubBy<IAssetAbility, "$id", "Alter Moves" | "Moves"> {
    "Alter Moves"?: IAlterMoveYaml[] | undefined;
    Moves?: IMoveYaml[] | undefined;
}
//# sourceMappingURL=IAssetAbilityYaml.d.ts.map