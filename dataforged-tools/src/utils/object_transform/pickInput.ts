//License: MIT
import { InputClock,InputNumber, InputText } from "@classes/common/index.js";
import { InputSelect } from "@classes/common/InputSelect.js";
import type { IAsset, IAssetAbility } from "@json_out/index.js";
import { InputType } from "@json_out/index.js";
import type { IInputClockYaml, IInputNumberYaml, IInputSelectYaml, IInputTextYaml, IInputYaml } from "@yaml_in/index.js";

/**
 * Infers the correct class for an IInputYaml object and constructs it.
 * @param inputJson - The data to pick a class for.
 */
export function pickInput<T extends InputType>(inputJson: IInputYaml & {"Input Type": T}, parent: IAsset|IAssetAbility) {
  switch (inputJson["Input Type"]) {
    case InputType.Clock: {
      return new InputClock(inputJson as unknown as IInputClockYaml, parent);
    }
    case InputType.Number: {
      return new InputNumber(inputJson as unknown as IInputNumberYaml, parent);
    }
    case InputType.Select: {
      return new InputSelect(inputJson as unknown as IInputSelectYaml, parent);
    }
    case InputType.Text: {
      return new InputText(inputJson as IInputTextYaml, parent);
    }
    default: {
      throw new Error("Unable to assign input data to a type - make sure it's correct.");
    }
  }
}