import { InputClockBuilder, InputNumberBuilder, InputSelectBuilder, InputTextBuilder } from "@builders";
import type { Asset, AssetAbility } from "@schema";
import { InputType } from "@schema";
import type { YamlInputClock, YamlInputNumber, YamlInputSelect, YamlInputText, YamlInput } from "@schema";

/**
 * Infers the correct class for an YamlInput object and constructs it.
 * @param inputJson - The data to pick a class for.
 */
export function pickInput<T extends InputType>(inputJson: YamlInput & {"Input Type": T}, parent: Asset|AssetAbility) {
  switch (inputJson["Input Type"]) {
    case InputType.Clock: {
      return new InputClockBuilder(inputJson as unknown as YamlInputClock, parent);
    }
    case InputType.Number: {
      return new InputNumberBuilder(inputJson as unknown as YamlInputNumber, parent);
    }
    case InputType.Select: {
      return new InputSelectBuilder(inputJson as unknown as YamlInputSelect, parent);
    }
    case InputType.Text: {
      return new InputTextBuilder(inputJson as YamlInputText, parent);
    }
    default: {
      throw new Error("Unable to assign input data to a type - make sure it's correct.");
    }
  }
}