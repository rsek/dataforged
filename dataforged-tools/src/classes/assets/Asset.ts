import { AssetAbility } from "@classes/assets/AssetAbility.js";
import { AssetState } from "@classes/assets/AssetState.js";
import { ConditionMeter } from "@classes/common/ConditionMeter.js";
import { DisplayWithTitle } from "@classes/common/Display.js";
import type { InputText } from "@classes/common/Input.js";
import type { InputSelect } from "@classes/common/InputSelect.js";
import { SourceInheritor } from "@classes/common/SourceInheritor.js";
import type { Gamespace , IAsset , IAssetAttachment, IAssetType, IAssetUsage, IDisplayWithTitle, ISource } from "@json_out/index.js";
import { InputSelectOptionType , InputType , Replacement } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { pickInput } from "@utils/object_transform/pickInput.js";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
import type { IAssetYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class Asset extends SourceInheritor implements IAsset {
  $id: IAsset["$id"];
  Name: string;
  States?: AssetState[]|undefined;
  Aliases?: string[] | undefined;
  "Asset Type": IAssetType["$id"];
  Display: IDisplayWithTitle;
  Usage: IAssetUsage;
  Attachments?: IAssetAttachment | undefined;
  Requirement?: string | undefined;
  Inputs?: (InputText|InputSelect)[] |undefined;
  Abilities: [AssetAbility, AssetAbility, AssetAbility];
  "Condition Meter"?: ConditionMeter | undefined;
  constructor(json: IAssetYaml, gamespace: Gamespace, parent: IAssetType, rootSource: ISource) {
    // uses RootSource as a starting point because category info has page numbers in the rulebook, rather than the asset pdf
    super(json.Source ?? {}, rootSource);
    // console.log(this.Source);
    this["Asset Type"] = parent.$id;
    this.$id = `${this["Asset Type"]}/${json.Name}`.replaceAll(" ", "_");
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this.Display = new DisplayWithTitle({
      parentId: this.$id,
      Title: json.Display?.Title ?? this.Name,
      Icon: json.Display?.Icon,
      Color: json.Display?.Color ?? parent.Display.Color
    });
    this.Usage = {
      Shared: [ "Command Vehicle", "Support Vehicle", "Module" ].includes(parent.Name) ? true : false
    };
    this.Attachments = json.Attachments;
    if (json.Inputs) {
      this.Inputs = json.Inputs.map(inputJson => {
        const result = pickInput<InputType.Select|InputType.Text>(inputJson, this);
        if (result["Input Type"] === InputType.Select) {
          result.Sets.forEach(hint => {
            let searchValue: Replacement|undefined = undefined;
            let replaceValue: string = this.$id;
            switch (hint.Type) {
              case InputSelectOptionType.ConditionMeter:
                searchValue = Replacement.AssetSelectMeter;
                replaceValue = this.$id;
                break;
              case InputSelectOptionType.Stat:
                searchValue = Replacement.AssetSelectStat;
                replaceValue = this.$id;
                break;
              default:
                break;
            }
            if (searchValue) {
              json.Abilities = replaceInAllStrings(json.Abilities, searchValue, replaceValue);
            }
          });
        }
        return result as InputSelect|InputText;
      });
    }
    if (json.States) {
      this.States = json.States.map(state => new AssetState(state)) ?? undefined;
    }
    this.Requirement = json.Requirement;
    this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter(json["Condition Meter"], this.$id + "/Condition_Meter", this["Asset Type"]) : undefined;
    if (json.Abilities.length !== 3) {
      throw badJsonError(this.constructor, json.Abilities, `Asset ${this.$id} doesn't have 3 abilities!`);
    } else {
      this.Abilities = json.Abilities.map((abilityJson, index) => new AssetAbility(abilityJson, `${this.$id}/Abilities/${index + 1}`, gamespace, this)) as [AssetAbility, AssetAbility, AssetAbility];
    }

    _.merge(this, replaceInAllStrings(this, Replacement.Asset, this.$id));

    if (this["Condition Meter"]) {
      _.merge(this, replaceInAllStrings(this, Replacement.AssetMeter, this["Condition Meter"].$id));
    }
  }
}

