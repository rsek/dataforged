import { DisplayWithTitle } from "@classes/common/Display.js";
import type { EncounterDisplay } from "@classes/index.js";
import { EncounterVariant , Source } from "@classes/index.js";
import { Gamespace } from "@json_out/index.js";
import type { ChallengeRank, EncounterNatureStarforged, EncounterTags, IEncounterStarforged, ISource, } from "@json_out/index.js";
import { toIdFragment } from "@utils/toIdFragment.js";
import type { IEncounterStarforgedYaml } from "@yaml_in/index.js";

/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @internal
 */
export class EncounterStarforged implements IEncounterStarforged {
  $id: IEncounterStarforged["$id"];
  Name: string;
  Nature: EncounterNatureStarforged;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display: EncounterDisplay;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants: EncounterVariant[];
  Description: string;
  "Quest Starter": string;
  Source: Source;
  constructor(json: IEncounterStarforgedYaml, ...ancestorSourceJson: ISource[]) {
    const gamespace = Gamespace.Starforged;
    this.$id = `${gamespace}/Encounters/${toIdFragment(json.Name)}`;
    this.Name = json.Name;
    this.Nature = json.Nature;
    this.Summary = json.Summary;
    this.Tags = json.Tags;
    this.Rank = json.Rank;
    this.Display = new DisplayWithTitle({ Title: json.Display?.Title?? this.Name });
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

