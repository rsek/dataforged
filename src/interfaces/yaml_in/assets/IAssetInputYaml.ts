import { IClockInput, ITextInput, ISelectInput, IAssetInput, INumberInput } from "@dataforged/interfaces/json_out/index.js";
import PartialBy from "@dataforged/utils/types/PartialBy.js";
import { StubBy } from "@dataforged/utils/types/Stub.js";

export interface IClockInputYaml extends PartialBy<IClockInput, "$id"> {}

export interface ITextInputYaml extends PartialBy<ITextInput, "$id"> {}

export interface ISelectInputYaml extends PartialBy<ISelectInput, "$id"> {}

export type IAssetInputYaml = StubBy<IAssetInput, "$id">;

export interface INumberInputYaml extends PartialBy<INumberInput, "$id"> {}
