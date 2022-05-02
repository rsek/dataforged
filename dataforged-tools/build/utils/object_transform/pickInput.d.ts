import { InputClock, InputNumber, InputText } from "../../classes/common/index.js";
import { InputSelect } from "../../classes/common/InputSelect.js";
import type { IAsset, IAssetAbility } from "../../json_out/index.js";
import { InputType } from "../../json_out/index.js";
import type { IInputYaml } from "../../yaml_in/index.js";
/**
 * Infers the correct class for an IInputYaml object and constructs it.
 * @param inputJson - The data to pick a class for.
 */
export declare function pickInput<T extends InputType>(inputJson: IInputYaml & {
    "Input Type": T;
}, parent: IAsset | IAssetAbility): InputNumber | InputClock | InputText | InputSelect;
//# sourceMappingURL=pickInput.d.ts.map