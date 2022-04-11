import type { IAssetAbility } from "@json_out/index.js";
import type { StubExcept } from "@utils/types/Stub.js";
import type { IAlterMoveYaml } from "@yaml_in/index.js";

export interface IAssetAbilityYaml extends StubExcept<IAssetAbility, "Text", "Alter Moves"> {
  Text: string;
  "Alter Moves"?: IAlterMoveYaml[] | undefined;
}
