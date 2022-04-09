import type { IAssetInput, IClockInput, INumberInput, ISelectInput, ITextInput } from "../../json_out/index.js";
import type { PartialBy } from "../../utils/types/PartialBy.js";
import type { StubBy } from "../../utils/types/Stub.js";
export interface IClockInputYaml extends PartialBy<IClockInput, "$id"> {
}
export interface ITextInputYaml extends PartialBy<ITextInput, "$id"> {
}
export interface ISelectInputYaml extends PartialBy<ISelectInput, "$id"> {
}
export declare type IAssetInputYaml = StubBy<IAssetInput, "$id">;
export interface INumberInputYaml extends PartialBy<INumberInput, "$id"> {
}
//# sourceMappingURL=IAssetInputYaml.d.ts.map