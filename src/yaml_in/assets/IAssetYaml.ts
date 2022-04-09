
import type { IAsset } from "@json_out/index.js";
import type { StubExcept } from "@utils/types/Stub.js";
import type { Tuple } from "@utils/types/Tuple.js";
import type { IAssetAbilityYaml } from "@yaml_in/index.js";

export interface IAssetYaml extends StubExcept<IAsset,"Name", "Abilities"> {
  Abilities: Tuple<IAssetAbilityYaml, 3>;
}
