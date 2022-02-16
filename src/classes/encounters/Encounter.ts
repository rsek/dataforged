

import { ChallengeRank } from "../general/ChallengeRank";
import { MdString } from "../general/MdString";
import { ISource, Source } from "../general/Source";
import { IOracleDisplay } from "../oracles/OracleDisplay";
import EncounterId from "./EncounterId";
import EncounterNature from "./EncounterNature";
import EncounterTags from "./EncounterTags";
import { IEncounterVariantData, EncounterVariant, IEncounterVariant } from "./EncounterVariant";

export interface IEncounterData {
  $id?: EncounterId | undefined;
  Name: string;
  Nature: EncounterNature;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Source: ISource;
  Rank: ChallengeRank;
  Display?: IOracleDisplay | undefined;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: IEncounterVariantData[] | undefined;
  Description: MdString;
  "Quest Starter": MdString;
}
// interface for outgoing JSON + deserialization
export interface IEncounter extends IEncounterData {
  $id: EncounterId
  Name: string;
  Nature: EncounterNature;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display?: IOracleDisplay | undefined;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: IEncounterVariant[] | undefined;
  Description: MdString;
  "Quest Starter": MdString;
  Source: ISource;
}

export class Encounter implements IEncounter {
  $id: EncounterId
  Name: string;
  Nature: EncounterNature;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display?: IOracleDisplay | undefined;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: EncounterVariant[] | undefined;
  Description: MdString;
  "Quest Starter": MdString;
  Source: Source;
  constructor(json: IEncounterData, ...ancestorSourceJson: ISource[]) {
    this.$id = `Encounters / ${json.Name}`;
    this.Name = json.Name
    this.Nature = json.Nature
    this.Summary = json.Summary
    this.Tags = json.Tags
    this.Rank = json.Rank
    this.Display = json.Display;
    this.Features = json.Features
    this.Drives = json.Drives
    this.Tactics = json.Tactics
    let newSource = new Source(json.Source, ...ancestorSourceJson);
    this.Variants = json.Variants?.map(variant => new EncounterVariant(variant, newSource));
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
    this.Source = newSource;
  }
}



