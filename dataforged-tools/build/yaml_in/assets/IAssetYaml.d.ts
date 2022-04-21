import type { IAsset, InputType } from "../../json_out/index.js";
import type { StubExcept } from "../../utils/types/Stub.js";
import type { IInputYaml } from "./IInputYaml.js";
import type { IAssetAbilityYaml } from "../index.js";
export interface IAssetYaml extends StubExcept<IAsset, "Name", "Abilities" | "Inputs"> {
    Abilities: [IAssetAbilityYaml, IAssetAbilityYaml, IAssetAbilityYaml];
    Inputs?: IInputYaml<InputType>[] | undefined;
}
//# sourceMappingURL=IAssetYaml.d.ts.map