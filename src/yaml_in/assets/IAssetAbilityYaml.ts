import type { IAssetAbility , ParagraphsString } from "@dataforged/json_out/index.js";
import type { StubExcept } from "@dataforged/utils/types/Stub.js";
import type { IAlterMoveYaml } from "@dataforged/yaml_in/index.js";

export interface IAssetAbilityYaml extends StubExcept<IAssetAbility, "Text", "Alter Moves"> {
  Text: ParagraphsString;
  "Alter Moves"?: IAlterMoveYaml[] | undefined;
}
