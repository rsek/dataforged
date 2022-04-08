import type { IAssetAbility } from "@dataforged/interfaces/json_out/assets/IAssetAbility.js";
import type IAlterMoveYaml from "@dataforged/interfaces/yaml_in/assets/IAlterMoveYaml.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";
import type { StubExcept } from "@dataforged/utils/types/Stub.js";

export default interface IAssetAbilityYaml extends StubExcept<IAssetAbility, "Text", "Alter Moves"> {
  Text: ParagraphsString;
  "Alter Moves"?: IAlterMoveYaml[] | undefined;
}
