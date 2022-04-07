import type IAsset from "@dataforged/interfaces/json_out/assets/IAsset.js";
import type IAssetAbilityYaml from "@dataforged/interfaces/yaml_in/assets/IAssetAbilityYaml.js";
import type { StubExcept } from "@dataforged/utils/types/Stub.js";
import type Tuple from "@dataforged/utils/types/Tuple.js";

export default interface IAssetYaml extends StubExcept<IAsset,"Name", "Abilities"> {
  Abilities: Tuple<IAssetAbilityYaml, 3>;
}
