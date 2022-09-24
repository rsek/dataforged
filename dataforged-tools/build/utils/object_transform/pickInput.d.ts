import { InputClockBuilder, InputNumberBuilder, InputSelectBuilder, InputTextBuilder } from "../../builders";
import type { Asset, AssetAbility } from "../../schema_json";
import { InputType } from "../../schema_json";
import type { YamlInput } from "../../schema_yaml";
/**
 * Infers the correct class for an YamlInput object and constructs it.
 * @param inputJson - The data to pick a class for.
 */
export declare function pickInput<T extends InputType>(inputJson: YamlInput & {
    "Input Type": T;
}, parent: Asset | AssetAbility): InputClockBuilder | InputNumberBuilder | InputSelectBuilder | InputTextBuilder;
//# sourceMappingURL=pickInput.d.ts.map