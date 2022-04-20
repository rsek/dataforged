import type { IAsset, InputType } from "../../json_out/index.js";
import type { StubExcept } from "../../utils/types/Stub.js";
import type { Tuple } from "../../utils/types/Tuple.js";
import type { IInputYaml } from "./IInputYaml.js";
import type { IAssetAbilityYaml } from "../index.js";
export interface IAssetYaml extends StubExcept<IAsset, "Name", "Abilities" | "Inputs"> {
    Abilities: Tuple<IAssetAbilityYaml, 3>;
    Inputs?: IInputYaml<InputType>[] | undefined;
}
//# sourceMappingURL=IAssetYaml.d.ts.map