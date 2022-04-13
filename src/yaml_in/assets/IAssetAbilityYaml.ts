
import type { IAssetAbility } from "@json_out/index.js";
import type { StubBy } from "@utils/types/Stub.js";
import type { IAlterMoveYaml } from "@yaml_in/index.js";
import type { IMoveYaml } from "@yaml_in/moves/IMoveYaml.js";

export interface IAssetAbilityYaml extends StubBy<IAssetAbility, "$id", "Alter Moves"|"Moves"> {
  "Alter Moves"?: IAlterMoveYaml[] | undefined;
  Moves?: IMoveYaml[]|undefined;
}
