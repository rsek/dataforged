import AssetAbility from "@dataforged/classes/assets/AssetAbility.js";
import ConditionMeter from "@dataforged/classes/common/ConditionMeter.js";
import { ClockInput, NumberInput, SelectInput, TextInput } from "@dataforged/classes/common/Input.js";
import SourceInheritor from "@dataforged/classes/common/SourceInheritor.js";
import InputType from "@dataforged/constants/InputType.js";
import type { IAsset } from "@dataforged/interfaces/json_out/assets/IAsset.js";
import type { IAssetAttachment } from "@dataforged/interfaces/json_out/assets/IAssetAttachment.js";
import type { IAssetInput } from "@dataforged/interfaces/json_out/assets/IAssetInput.js";
import type { IAssetType } from "@dataforged/interfaces/json_out/assets/IAssetType.js";
import type { IDisplay } from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type IAssetYaml from "@dataforged/interfaces/yaml_in/assets/IAssetYaml.js";
import type { AssetAbilityId } from "@dataforged/strings/id/AssetAbilityId.js";
import type { AssetId } from "@dataforged/strings/id/AssetId.js";
import type { AssetTypeId } from "@dataforged/strings/id/AssetTypeId.js";
import type { FragmentString } from "@dataforged/strings/MdString.js";
import badJsonError from "@dataforged/utils/logging/badJsonError.js";
import buildLog from "@dataforged/utils/logging/buildLog.js";
import type { RequireKey } from "@dataforged/utils/types/RequireKey.js";
import type Tuple from "@dataforged/utils/types/Tuple.js";

export default class Asset extends SourceInheritor implements IAsset {
  $id: AssetId;
  Name: string;
  Aliases?: string[] | undefined;
  "Asset Type": AssetTypeId;
  Display: RequireKey<IDisplay, "Color">;  Attachments?: IAssetAttachment | undefined;
  Inputs?: IAssetInput[] | undefined;
  Requirement?: FragmentString | undefined;
  Abilities: Tuple<AssetAbility, 3>;
  "Condition Meter"?: ConditionMeter | undefined;
  constructor(json: IAssetYaml, parent: IAssetType) {
    super(json.Source ?? {}, parent.Source);
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
      this.Inputs = json.Inputs.map(inputJson => {
        const idString = `${this.$id} / Inputs / ${inputJson.Name}`;
        switch (inputJson["Input Type"]) {
          case InputType.Clock: {
            return new ClockInput(inputJson, idString);
          }
          case InputType.Number: {
            return new NumberInput(inputJson, idString);
          }
          case InputType.Select:{
            return new SelectInput(inputJson, idString);
          }
          case InputType.Text: {
            return new TextInput(inputJson, idString);
          }
          default: {
            throw new Error("Unable to assign input data to a type - make sure it's correct.");
          }
        }
      }) as IAssetInput[];
    }
    this.Requirement = json.Requirement;
    if (json.Abilities.length !== 3) {
      throw badJsonError(this.constructor, json.Abilities, `Asset ${this.$id} doesn't have 3 abilities!`);
    }
    this.Abilities = json.Abilities.map((ability, index) => new AssetAbility(ability, this.$id + ` / Abilities / ${index + 1}` as AssetAbilityId, this)) as Tuple<AssetAbility, 3>;
    this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter(json["Condition Meter"], this.$id + " / Condition Meter", this["Asset Type"]) : undefined;
  }
}
