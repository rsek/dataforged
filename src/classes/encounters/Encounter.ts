import Source from "@dataforged/classes/common/Source.js";
import EncounterDisplay from "@dataforged/classes/encounters/EncounterDisplay.js";
import EncounterVariant from "@dataforged/classes/encounters/EncounterVariant.js";
import type ISource from "@dataforged/interfaces/json_out/common/ISource.js";
import type IEncounter from "@dataforged/interfaces/json_out/encounters/IEncounter.js";
import type IEncounterYaml from "@dataforged/interfaces/yaml_in/encounters/IEncounterYaml.js";
import type EncounterId from "@dataforged/strings/id/EncounterId.js";
import type { FragmentString, ParagraphsString, SentenceString } from "@dataforged/strings/MdString.js";
import type ChallengeRank from "@dataforged/constants/ChallengeRank.js";
import type EncounterNature from "@dataforged/constants/EncounterNature.js";
import type EncounterTags from "@dataforged/constants/EncounterTags.js";

export default class Encounter implements IEncounter {
  $id: EncounterId;
  Name: string;
  Nature: EncounterNature;
  Summary: SentenceString | FragmentString;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display: EncounterDisplay;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: EncounterVariant[] | undefined;
  Description: ParagraphsString;
  "Quest Starter": ParagraphsString;
  Source: Source;
  constructor(json: IEncounterYaml, ...ancestorSourceJson: ISource[]) {
    this.$id = `Encounters / ${json.Name}`;
    this.Name = json.Name;
    this.Nature = json.Nature;
    this.Summary = json.Summary;
    this.Tags = json.Tags;
    this.Rank = json.Rank;
    this.Display = new EncounterDisplay(json.Display ?? {}, this.Name);
    this.Features = json.Features;
    this.Drives = json.Drives;
    this.Tactics = json.Tactics;
    const newSource = new Source(json.Source, ...ancestorSourceJson);
    this.Variants = json.Variants?.map(variant => new EncounterVariant(variant, newSource));
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
    this.Source = newSource;
  }
}

