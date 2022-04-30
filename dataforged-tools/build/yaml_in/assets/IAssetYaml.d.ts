import type { IAsset, InputSelectOptionType } from "../../json_out/index.js";
import type { StubExcept } from "../../utils/types/Stub.js";
import type { IInputSelectYaml } from "./IInputSelectYaml.js";
import type { IInputTextYaml } from "./IInputYaml.js";
import type { IAssetAbilityYaml } from "../index.js";
export interface IAssetYaml extends StubExcept<IAsset, "Name", "Abilities" | "Inputs"> {
    Abilities: [IAssetAbilityYaml, IAssetAbilityYaml, IAssetAbilityYaml];
    Inputs?: (IInputTextYaml | IInputSelectYaml<InputSelectOptionType>)[] | undefined;
}
//# sourceMappingURL=IAssetYaml.d.ts.map