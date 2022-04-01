import type EncounterId from "./EncounterId.js";
import type EncounterNature from "./EncounterNature.js";
import type EncounterTags from "./EncounterTags";
import type IEncounterVariant from "./IEncounterVariant.js";
import type IEncounterVariantYaml from "./IEncounterVariantYaml.js";
import type ChallengeRank from "../general/ChallengeRank.js";
import type ISource from "../general/interfaces/ISource.js";
import Source from "../general/Source.js";
import type ITableDisplay from "../oracles/interfaces/IOracleDisplay.js";

export default class EncounterVariant implements IEncounterVariant {
  $id: EncounterId;
  Source: Source;
  Name!: string;
  Rank!: ChallengeRank;
  Display?: ITableDisplay | undefined;
  Description!: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
  constructor(json: IEncounterVariantYaml, ancestorSourceJson: ISource) {
    this.$id = (`Encounters / ${json.Name}`);
    Object.assign(this, json);
    this.Source = new Source(ancestorSourceJson);
  }
}
