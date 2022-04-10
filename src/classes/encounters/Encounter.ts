import { EncounterDisplay , EncounterVariant , Source } from "@classes/index.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, FragmentString, IEncounter, ISource, ParagraphsString, SentenceString } from "@json_out/index.js";
import type { IEncounterYaml } from "@yaml_in/index.js";

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
    this.$id = `Encounters/${json.Name.replaceAll(" ", "_")}`;
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
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
    this.Source = newSource;
    this.Variants = json.Variants?.map(variant => new EncounterVariant(variant, this));
  }
}

