import type { IInputSelectOption } from "../../json_out/assets/IInputSelectOption.js";
import type { IInputSelect, InputSelectOptionType } from "../../json_out/index.js";
import type { StubBy } from "../../utils/types/Stub.js";
export interface IInputSelectYaml<K extends string, V extends InputSelectOptionType> extends StubBy<IInputSelect<K, V>, never, "$id" | "Options"> {
    Options: IInputSelectOptionYaml<K, V>[];
}
export interface IInputSelectOptionYaml<K extends string, V extends InputSelectOptionType> extends StubBy<IInputSelectOption<K, V>, never, "$id"> {
}
//# sourceMappingURL=IInputSelectYaml.d.ts.map