
import type { IAsset } from "@dataforged/json_out/index.js";
import type { StubExcept } from "@dataforged/utils/types/Stub.js";
import type { Tuple } from "@dataforged/utils/types/Tuple.js";
import type { IAssetAbilityYaml } from "@dataforged/yaml_in/index.js";

export interface IAssetYaml extends StubExcept<IAsset,"Name", "Abilities"> {
  Abilities: Tuple<IAssetAbilityYaml, 3>;
}
