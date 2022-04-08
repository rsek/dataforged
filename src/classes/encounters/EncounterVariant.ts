import Source from "@dataforged/classes/common/Source.js";
import type { ChallengeRank } from "@dataforged/constants/ChallengeRank.js";
import type { EncounterNature } from "@dataforged/constants/EncounterNature.js";
import type { EncounterTags } from "@dataforged/constants/EncounterTags.js";
import type { ISource } from "@dataforged/interfaces/json_out/common/ISource.js";
import type { ParagraphsString } from "@dataforged/interfaces/json_out/common/strings/MdString.js";
import type { IEncounterVariant } from "@dataforged/interfaces/json_out/encounters/IEncounterVariant.js";
import type { EncounterId } from "@dataforged/interfaces/json_out/encounters/strings/EncounterId.js";
import type { ITableDisplay } from "@dataforged/interfaces/json_out/oracles/IOracleDisplay.js";
import type IEncounterVariantYaml from "@dataforged/interfaces/yaml_in/encounters/IEncounterVariantYaml.js";

export default class EncounterVariant implements IEncounterVariant {
  $id: EncounterId;
  Source: Source;
  Name!: string;
  Rank!: ChallengeRank;
  Display?: ITableDisplay | undefined;
  Description!: ParagraphsString;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
  constructor(json: IEncounterVariantYaml, ancestorSourceJson: ISource) {
    this.$id = (`Encounters / ${json.Name}`);
    Object.assign(this, json);
    this.Source = new Source(ancestorSourceJson);
  }
}
