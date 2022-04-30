
import type { IAsset, InputSelectOptionType, InputType } from "@json_out/index.js";
import type { StubExcept } from "@utils/types/Stub.js";
import type { IInputSelectYaml } from "@yaml_in/assets/IInputSelectYaml.js";
import type { IInputTextYaml, IInputYaml } from "@yaml_in/assets/IInputYaml.js";
import type { IAssetAbilityYaml } from "@yaml_in/index.js";

export interface IAssetYaml extends StubExcept<IAsset,"Name", "Abilities"|"Inputs"> {
  Abilities: [IAssetAbilityYaml,IAssetAbilityYaml,IAssetAbilityYaml];
  Inputs?: (IInputTextYaml|IInputSelectYaml<InputSelectOptionType>)[]|undefined;
}
