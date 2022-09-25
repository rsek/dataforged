import { AssetAbilityBuilder, AssetStateBuilder, ConditionMeterBuilder, DisplayBuilder, SourceInheritorBuilder, TitleBuilder } from "@builders";
import { InputSelectOptionType, InputType, Replacement } from "@schema";
import type { Asset , AssetAbility, AssetAttachment, AssetState, AssetType, AssetUsage, ConditionMeter, Display, Gamespace, InputClock, InputNumber, InputSelect, InputText, Source, Title, YamlAsset } from "@schema";
import { formatId } from "@utils";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { pickInput } from "@utils/object_transform/pickInput.js";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
import _ from "lodash-es";Game

/**
 * @internal
 */
export class AssetBuilder extends SourceInheritorBuilder implements Asset {
  $id: Asset["$id"];
  Title: Title;
  States?: AssetState[]|undefined;
  Aliases?: string[] | undefined;
  "Asset Type": AssetType["$id"];
  Display: Display;
  Usage: AssetUsage;
  Attachments?: AssetAttachment | undefined;
  Requirement?: string | undefined;
  Inputs?: (InputText|InputSelect|InputClock|InputNumber)[] |undefined;
  Abilities: [AssetAbility, AssetAbility, AssetAbility];
  "Condition Meter"?: ConditionMeter | undefined;
  constructor(json: YamlAsset, gamespace: Gamespace, parent: AssetType, rootSource: Source) {
    // uses RootSource as a starting pointGamecategory info has page numbers in the rulebook, rather than the asset pdf
    super(json.Source ?? {}, rootSource);
    // console.log(this.Source);
    this["Asset Type"] = parent.$id;
    const fragment = json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical;
    this.$id = formatId(fragment,this["Asset Type"]);
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Title = new TitleBuilder(json.Title,this);
    this.Aliases = json.Aliases;
    this.Display = new DisplayBuilder({
      Icon: json.Display?.Icon,
      Color: json.Display?.Color ?? parent.Display.Color
    });
    this.Usage = {
      Shared: [ "Command Vehicle", "Support Vehicle", "Module" ].includes(parent.Title.Short ?? parent.Title.Canonical) ? true : false
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
        return result;
      });
    }
    if (json.States) {
      this.States = json.States.map(state => new AssetStateBuilder(state, this)) ?? undefined;
    }
    this.Requirement = json.Requirement;
    this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeterBuilder(json["Condition Meter"], this.$id + "/Condition_Meter", this["Asset Type"]) : undefined;
    if (json.Abilities.length !== 3) {
      throw badJsonError(this.constructor, json.Abilities, `Asset ${this.$id} doesn't have 3 abilities!`);
    } else {
      this.Abilities = json.Abilities.map((abilityJson, index) => new AssetAbilityBuilder(abilityJson, `${this.$id}/Abilities/${index + 1}`, gamespace, this)) as [AssetAbilityBuilder, AssetAbilityBuilder, AssetAbilityBuilder];
    }

    _.merge(this, replaceInAllStrings(this, Replacement.Asset, this.$id));

    if (this["Condition Meter"]) {
      _.merge(this, replaceInAllStrings(this, Replacement.AssetMeter, this["Condition Meter"].$id));
    }
  }
}

