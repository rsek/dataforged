
import { is } from "typescript-is";
import AssetAbility from "./AssetAbility.js";
import type IAssetAttachment from "./AssetAttachment.js";

import type AssetId from "./AssetId.js";
import type AssetType from "./AssetType.js";
import type IAsset from "./interfaces/IAsset.js";
import type IAssetYaml from "./interfaces/IAssetYaml.js";
import badJsonError from "../../functions/logging/badJsonError.js";
import buildLog from "../../functions/logging/buildLog.js";
import { ConditionMeter } from "../general/ConditionMeter.js";
import { Input, NumberInput, SelectInput, TextInput } from "../general/Input.js";
import type { IInput, INumberInput, ISelectInput, ITextInput } from "../general/Input.js";
import type ISource from "../general/interfaces/ISource.js";
import Source from "../general/Source.js";

export default class Asset implements IAsset {
  $id: AssetId;
  Name: string;
  Aliases?: string[] | undefined;
  "Asset Type": AssetType;
  Attachments?: IAssetAttachment | undefined;
  Inputs?: IInput[] | undefined;
  Requirement?: string | undefined;
  Abilities: AssetAbility[];
  "Condition Meter"?: ConditionMeter | undefined;
  Source: Source;
  constructor(json: IAssetYaml, source: ISource) {
    this.$id = `Assets / ${json.Name}`;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this["Asset Type"] = json["Asset Type"];
    this.Attachments = json.Attachments;

    if (json.Inputs) {
      if (!is<IInput[]>(json.Inputs)) {
        throw badJsonError(this.constructor, json.Inputs, "excpected IInput[]");
      }
      this.Inputs = (json.Inputs ).map(inputJson => {
        const idString = `${this.$id} / Inputs / ${inputJson.Name}`;
        if (is<INumberInput>(inputJson)) {
          return new NumberInput(inputJson, idString);
        } else if (is<ISelectInput>(inputJson)) {
          return new SelectInput(inputJson, idString);
        } else if (is<ITextInput>(inputJson)) {
          return new TextInput(inputJson, idString);
        } else { badJsonError(this.constructor, inputJson, "Unrecognized input"); }
      }) as IInput[];
    }
    this.Requirement = json.Requirement;
    this.Abilities = json.Abilities.map((ability, index) => new AssetAbility(ability, this.$id + ` / Abilities / ${index + 1}`));
    this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter(json["Condition Meter"], this.$id + " / Condition Meter", this["Asset Type"]) : undefined;
    this.Source = new Source(source);
  }
}
