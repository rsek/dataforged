import { ChallengeRank } from "../general/ChallengeRank";
import { IEncounterData } from "./Encounter";
import EncounterId from "./EncounterId";
import EncounterTags from "./EncounterTags";
import EncounterNature from "./EncounterNature";
import { ISource, Source } from "../general/Source";
import { IOracleDisplay } from "../oracles/OracleDisplay";


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
  Display?: IOracleDisplay | undefined;
  Description!: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
  constructor(json: IEncounterVariantData, ancestorSourceJson: ISource) {
    this.$id = (`Encounters / ${json.Name}`);
    Object.assign(this, json);
    this.Source = new Source(ancestorSourceJson);
  }
}
