
import ChallengeRank from "../general/ChallengeRank";

import ISource from "../general/interfaces/ISource";
import MdString from "../general/MdString";
import Source from "../general/Source";
import EncounterDisplay from "./EncounterDisplay";
import EncounterId from "./EncounterId";
import EncounterNature from "./EncounterNature";
import EncounterTags from "./EncounterTags";
import EncounterVariant from "./EncounterVariant";
import IEncounter from "./IEncounter";
import IEncounterYaml from "./IEncounterYaml";

export default class Encounter implements IEncounter {
  $id: EncounterId
  Name: string;
  Nature: EncounterNature;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display?: EncounterDisplay | undefined;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: EncounterVariant[] | undefined;
  Description: MdString;
  "Quest Starter": MdString;
  Source: Source;
  constructor(json: IEncounterYaml, ...ancestorSourceJson: ISource[]) {
    this.$id = `Encounters / ${json.Name}`;
    this.Name = json.Name
    this.Nature = json.Nature
    this.Summary = json.Summary
    this.Tags = json.Tags
    this.Rank = json.Rank
    this.Display = new EncounterDisplay(json.Display ?? {}, this.Name);
    this.Features = json.Features
    this.Drives = json.Drives
    this.Tactics = json.Tactics
    const newSource = new Source(json.Source, ...ancestorSourceJson);
    this.Variants = json.Variants?.map(variant => new EncounterVariant(variant, newSource));
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
    this.Source = newSource;
  }
}



