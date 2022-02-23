import ChallengeRank from "../general/ChallengeRank";
import { IEncounterData } from "./Encounter";
import EncounterId from "./EncounterId";
import EncounterTags from "./EncounterTags";
import EncounterNature from "./EncounterNature";
import Source from "../general/Source";
import ISource from "../general/interfaces/ISource";
import ITableDisplay from "../oracles/interfaces/IOracleDisplay";


export interface IEncounterVariantData extends Partial<IEncounterData> {
  $id?: EncounterId;
  Name: string;
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}


export interface IEncounterVariant extends IEncounterVariantData {
  $id: EncounterId;
  Source: ISource;
  Name: string;
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}

export class EncounterVariant implements IEncounterVariant {
  $id: EncounterId;
  Source: Source;
  Name!: string;
  Rank!: ChallengeRank;
  Display?: ITableDisplay | undefined;
  Description!: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
  constructor(json: IEncounterVariantData, ancestorSourceJson: ISource) {
    this.$id = (`Encounters / ${json.Name}`);
    Object.assign(this, json);
    this.Source = new Source(ancestorSourceJson);
  }
}
