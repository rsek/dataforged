import ChallengeRank from "../general/ChallengeRank";
import EncounterId from "./EncounterId";
import EncounterTags from "./EncounterTags";
import EncounterNature from "./EncounterNature";
import Source from "../general/Source";
import ISource from "../general/interfaces/ISource";
import ITableDisplay from "../oracles/interfaces/IOracleDisplay";
import IEncounterVariantYaml from "./IEncounterVariantYaml";
import IEncounterVariant from "./IEncounterVariant";


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
