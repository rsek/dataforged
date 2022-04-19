import { AssetAbility } from "@classes/assets/AssetAbility.js";
import { ConditionMeter } from "@classes/common/ConditionMeter.js";
import type { Input } from "@classes/common/Input.js";
import { SourceInheritor } from "@classes/common/SourceInheritor.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import { InputType } from "@json_out/common/index.js";
import { Replacement } from "@json_out/common/Replacement.js";
import type { AssetId, IAsset, IAssetAttachment, IAssetType, RequireKey, Tuple } from "@json_out/index.js";
import { InputSelectOptionType } from "@json_out/index.js";
import type { IDisplay, ISource } from "@json_out/meta/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { pickInput } from "@utils/object_transform/pickInput.js";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
import type { IAssetYaml } from "@yaml_in/assets/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class Asset extends SourceInheritor implements IAsset {
  $id: AssetId;
  Name: string;
  Aliases?: string[] | undefined;
  "Asset Type": IAssetType["$id"];
  Display: RequireKey<IDisplay, "Color">;
  Attachments?: IAssetAttachment | undefined;
  Requirement?: string | undefined;
  Inputs?: Input<InputType>[] | undefined;
  Abilities: Tuple<AssetAbility, 3>;
  "Condition Meter"?: ConditionMeter | undefined;
  constructor(json: IAssetYaml, gamespace: Gamespace, parent: IAssetType, rootSource: ISource) {
    // uses RootSource as a starting point because category info has page numbers in the rulebook, rather than the asset pdf
    super(json.Source ?? {}, rootSource);
    // console.log(this.Source);
    this["Asset Type"] = parent.$id;
    this.$id = `${this["Asset Type"]}/${json.Name}`.replaceAll(" ", "_") as AssetId;
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
        const result = pickInput(inputJson, this);
        if (result["Input Type"] === InputType.Select) {
          result.Sets.forEach(hint => {
            let searchValue: Replacement|undefined = undefined;
            switch (hint.Type) {
              case InputSelectOptionType.ConditionMeter:
                searchValue = Replacement.AssetSelectMeter;
                break;
              case InputSelectOptionType.Stat:
                searchValue = Replacement.AssetSelectStat;
                break;
              default:
                break;
            }
            if (searchValue) {
              json.Abilities = replaceInAllStrings(json.Abilities, searchValue, hint.$id);
            }
          });
        }
        return result;
      });
    }
    this.Requirement = json.Requirement;
    if (json.Abilities.length !== 3) {
      throw badJsonError(this.constructor, json.Abilities, `Asset ${this.$id} doesn't have 3 abilities!`);
    }
    this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter(json["Condition Meter"], this.$id + "/Condition_Meter", this["Asset Type"]) : undefined;
    this.Abilities = json.Abilities.map((abilityJson, index) => new AssetAbility(abilityJson, `${this.$id}/Abilities/${index + 1}`, gamespace, this)) as Tuple<AssetAbility, 3>;

    _.merge(this, replaceInAllStrings(this, Replacement.Asset, this.$id));

    if (this["Condition Meter"]) {
      _.merge(this, replaceInAllStrings(this, Replacement.AssetMeter, this["Condition Meter"].$id));
    }
  }
}