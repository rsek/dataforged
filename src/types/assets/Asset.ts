
import { is } from "typescript-is";
import type { AssetAbilityId } from "./AssetAbility.js";
import AssetAbility from "./AssetAbility.js";
import type IAssetAttachment from "./AssetAttachment.js";

import type AssetId from "./AssetId.js";
import type AssetTypeId from "./AssetTypeId.js";
import type IAsset from "./interfaces/IAsset.js";
import type { IAssetType } from "./interfaces/IAssetType.js";
import type IAssetYaml from "./interfaces/IAssetYaml.js";
import type { WithRequired } from "./WithRequired.js";
import badJsonError from "../../functions/logging/badJsonError.js";
import buildLog from "../../functions/logging/buildLog.js";
import { ConditionMeter } from "../general/ConditionMeter.js";
import type IDisplay from "../general/IDisplay.js";
import { ClockInput, NumberInput, SelectInput, TextInput } from "../general/Input.js";
import type { IClockInput, IInput, INumberInput, ISelectInput , ITextInput } from "../general/Input.js";
import type ISource from "../general/interfaces/ISource.js";
import type MdString from "../general/MdString.js";
import Source from "../general/Source.js";
import type Tuple from "../general/Tuple.js";

export default class Asset implements IAsset {
  $id: AssetId;
  Name: string;
  Aliases?: string[] | undefined;
  "Asset Type": AssetTypeId;
  Display: WithRequired<IDisplay, "Color">;  Attachments?: IAssetAttachment | undefined;
  Inputs?: IInput[] | undefined;
  Requirement?: MdString | undefined;
  Abilities: Tuple<AssetAbility, 3>;
  "Condition Meter"?: ConditionMeter | undefined;
  Source: Source;
  constructor(json: IAssetYaml, source: ISource, parent: WithRequired<IAssetType, "$id">) {
    this["Asset Type"] = parent.$id;
    this.$id = `${this["Asset Type"]} / ${json.Name}`;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Display = {
      Title: json.Display?.Title ?? this.Name,
      Color: json.Display?.Color ?? parent.Display.Color
    };
    this.Attachments = json.Attachments;

    if (json.Inputs) {
      if (!is<IInput[]>(json.Inputs)) {
        throw badJsonError(this.constructor, json.Inputs, "expected IInput[]");
      }
      this.Inputs = (json.Inputs ).map(inputJson => {
        const idString = `${this.$id} / Inputs / ${inputJson.Name}`;
        if (is<INumberInput>(inputJson)) {
          return new NumberInput(inputJson, idString);
        } else if (is<ISelectInput>(inputJson)) {
          return new SelectInput(inputJson, idString);
        } else if (is<ITextInput>(inputJson)) {
          return new TextInput(inputJson, idString);
        } else if (is<IClockInput>(inputJson)) {
          return new ClockInput(inputJson, idString);
        } else { throw badJsonError(this.constructor, inputJson, "Unrecognized input"); }
      }) as IInput[];
    }
    this.Requirement = json.Requirement;
    if (json.Abilities.length !== 3) {
      throw badJsonError(this.constructor, json.Abilities, `Asset ${this.$id} doesn't have 3 abilities!`);
    }
    this.Abilities = json.Abilities.map((ability, index) => new AssetAbility(ability, this.$id + ` / Abilities / ${index + 1}` as AssetAbilityId, this)) as Tuple<AssetAbility, 3>;
    this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter(json["Condition Meter"], this.$id + " / Condition Meter", this["Asset Type"]) : undefined;
    this.Source = new Source(source);
  }
}
