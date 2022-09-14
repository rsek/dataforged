import { Display } from "@classes/common/Display.js";
import { EncounterVariant , Source , Title } from "@classes/index.js";
import { Gamespace } from "@json_out/index.js";
import type { ChallengeRank, EncounterNatureStarforged, EncounterTags, IEncounterStarforged,  ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";
import type { IEncounterStarforgedYaml } from "@yaml_in/index.js";

/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @internal
 */
export class EncounterStarforged implements IEncounterStarforged {
  $id: IEncounterStarforged["$id"];
  Title: Title;
  Nature: EncounterNatureStarforged;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display: Display;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants: EncounterVariant[];
  Description: string;
  "Quest Starter": string;
  Source: Source;
  constructor(json: IEncounterStarforgedYaml, ...ancestorSourceJson: ISource[]) {
    const gamespace = Gamespace.Starforged;
    this.$id = `${gamespace}/Encounters/${formatIdFragment(json._idFragment?? json.Title.Canonical)}`;
    this.Title = new Title(json.Title, this);
    this.Nature = json.Nature;
    this.Summary = json.Summary;
    this.Tags = json.Tags;
    this.Rank = json.Rank;
    this.Display = new Display({ });
    this.Features = json.Features;
    this.Drives = json.Drives;
    this.Tactics = json.Tactics;
    const newSource = new Source(json.Source ?? {}, ...ancestorSourceJson);
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
    this.Source = newSource;
    this.Variants = json.Variants.map(variant => new EncounterVariant(variant, this));
  }
}

