
import type { IInputSelectOption } from "@json_out/assets/IInputSelectOption.js";
import type { IInputSelect, InputSelectOptionType } from "@json_out/index.js";
import type { StubBy } from "@utils/types/Stub.js";

export interface IInputSelectYaml<V extends InputSelectOptionType> extends StubBy<IInputSelect<V>, never, "$id"|"Options"> {
  Options: IInputSelectOptionYaml<V>[]
 }

export interface IInputSelectOptionYaml<V extends InputSelectOptionType> extends StubBy<IInputSelectOption< V>, never, "$id"> { }
