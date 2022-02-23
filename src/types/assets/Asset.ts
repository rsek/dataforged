import t from 'ts-runtime/lib';
import { ConditionMeter } from "../general/ConditionMeter";
import Source from "../general/Source";
import ISource from "../general/interfaces/ISource";
import AssetAbility from "./AssetAbility";
import AssetType from "./AssetType";
import { IInput, Input, isNumberInput, isSelectInput, isTextInput, NumberInput, SelectInput, TextInput } from "../general/Input";
import IAssetAttachment from "./AssetAttachment";

import AssetId from './AssetId';
import IAsset from './interfaces/IAsset';
import IAssetData from './interfaces/IAssetData';

export default class Asset implements IAsset {
  $id: AssetId;
  Name: string;
  Aliases?: string[] | undefined;
  "Asset Type": AssetType;
  Attachments?: IAssetAttachment | undefined;
  Inputs?: Input[] | undefined;
  Requirement?: string | undefined;
  Abilities: AssetAbility[];
  "Condition Meter"?: ConditionMeter | undefined;
  Source: Source;
  constructor(json: IAssetData, source: ISource) {
    this.$id = `Assets / ${json.Name}`;
    console.info(`[Asset.constructor] Building ${this.$id}...`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this["Asset Type"] = json["Asset Type"];
    this.Attachments = json.Attachments;
    if (json.Inputs) {
      this.Inputs = (json.Inputs as IInput[]).map(inputJson => {
        const idString = `${this.$id} / Inputs / ${inputJson.Name}`;
        if (isNumberInput(inputJson)) {
          return new NumberInput(inputJson, idString);
        }
        else if (isSelectInput(inputJson)) {
          return new SelectInput(inputJson, idString);
        }
        else if (isTextInput(inputJson)) {
          return new TextInput(inputJson, idString);
        }
        else { new Error("Unable to assign input data to a type - make sure it's correct."); }
      }) as Input[];
    }
    this.Requirement = json.Requirement;
    this.Abilities = json.Abilities.map((ability, index) => new AssetAbility(ability, this.$id + ` / Abilities / ${index + 1}`));
    this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter(json["Condition Meter"], this.$id + " / Condition Meter", this["Asset Type"]) : undefined;
    this.Source = new Source(source);
  }
}
