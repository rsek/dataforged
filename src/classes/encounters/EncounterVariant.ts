import { Source } from "@dataforged/classes/common/Source.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, IEncounterVariant, ISource, ITableDisplay, ParagraphsString } from "@dataforged/json_out/index.js";
import type { IEncounterVariantYaml } from "@dataforged/yaml_in/index.js";


export class EncounterVariant implements IEncounterVariant {
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
