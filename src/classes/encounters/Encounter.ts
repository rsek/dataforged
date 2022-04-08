import { Source } from "@dataforged/classes/common/Source.js";
import { EncounterDisplay } from "@dataforged/classes/encounters/EncounterDisplay.js";
import { EncounterVariant } from "@dataforged/classes/encounters/EncounterVariant.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, FragmentString, IEncounter, ISource, ParagraphsString, SentenceString } from "@dataforged/json_out/index.js";
import type { IEncounterYaml } from "@dataforged/yaml_in/index.js";

export class Encounter implements IEncounter {
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

