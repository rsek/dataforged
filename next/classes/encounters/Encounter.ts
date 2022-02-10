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
  $id?: string;
  Name: string;
}

enum EncounterTags {
  Vehicle = "vehicle"
}

export interface IEncounter {
  $id?: string;
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

// export class Encounter implements IEncounter {
//   $id: string;
//   Name: string;
//   Nature: EncounterNature;
//   Summary: string;
//   Tags?: string[] | undefined;
//   Source: ISource;
//   Rank: ChallengeRank;
//   Features: string[];
//   Drives: string[];
//   Tactics: string[];
//   Variants?: Encounter[];
//   "Variant of": string; // encounter ID
//   Description: string;
//   "Quest Starter": string;
//   constructor(json: IEncounter) {
//     this.$id = `${json.Nature} / ${json.Name}`;


//     if (json.Variants) {
//       json.Variants.map(variant => {
//         const enc = Object.assign({}, json);
//         delete enc.Variants;
//         Object.assign(enc, variant);
//         return new Encounter(enc);
//       });
//     }
//   }
// }