

import { ChallengeRank } from "../general/ChallengeRank";
import { MdString } from "../general/MdString";
import { ISource } from "../general/Source";

enum EncounterNature {
  Creature = "Creature",
  Horror = "Horror",
  Human = "Human",
  Machine = "Machine",
  Monster = "Monster",
}

export interface IEncounterVariant extends Partial<IEncounter> {
  $id?: EncounterId;
  Name: string;
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNature | undefined;
  Tags?: EncounterTags[] | undefined;
}

enum EncounterTags {
  Vehicle = "vehicle"
}

export type EncounterId = `Encounters / ${string}`;

export interface IEncounter {
  $id?: EncounterId | undefined;
  Name: string;
  Nature: EncounterNature;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Source: ISource;
  Rank: ChallengeRank;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: IEncounterVariant[] | undefined;
  Description: MdString;
  "Quest Starter": MdString;
}

export class Encounter implements IEncounter {
  $id: EncounterId
  Name!: string;
  Nature!: EncounterNature;
  Summary!: string;
  Tags?: EncounterTags[] | undefined;
  Source!: ISource;
  Rank!: ChallengeRank;
  Features!: string[];
  Drives!: string[];
  Tactics!: string[];
  Variants?: IEncounterVariant[] | undefined;
  Description!: string;
  "Quest Starter"!: string;
  constructor(json: IEncounter) {
    this.$id = `Encounters / ${json.Name}`;
    Object.assign(this, json);
  }
}

export class EncounterVariant implements IEncounterVariant {
  $id: EncounterId;
  Name!: string;
  Rank!: ChallengeRank;
  Description!: string;
  Nature?: EncounterNature | undefined;

  constructor(json: IEncounterVariant) {
    this.$id = (`Encounters / ${json.Name.replace(" (vehicle)", "")}`);
    Object.assign(this, json);
  }
}
