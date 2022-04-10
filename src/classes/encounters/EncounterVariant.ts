import { Source } from "@classes/index.js";
import type { Encounter  } from "@classes/index.js";
import type { ChallengeRank, EncounterId, EncounterNature, EncounterTags, IDisplay, IEncounterVariant, ParagraphsString } from "@json_out/index.js";
import type { IEncounterVariantYaml } from "@yaml_in/index.js";


export class EncounterVariant implements IEncounterVariant {
  $id: EncounterId;
  Source: Source;
  Name: string;
  Rank: ChallengeRank;
  Display: IDisplay;
  Description: ParagraphsString;
  Nature: EncounterNature;
  "Variant of": EncounterId;
  Tags?: EncounterTags[] | undefined;
  constructor(json: IEncounterVariantYaml, parent: Encounter) {
    this.$id = (`${parent.$id}/${json.Name.replaceAll(" ", "_")}`);
    this.Source = new Source(parent.Source);
    this.Name = json.Name;
    this.Rank = json.Rank;
    this.Display = json.Display ?? { Title: this.Name };
    if (!this.Display.Title) {
      this.Display.Title = this.Name;
    }
    this.Description = json.Description;
    this.Nature = json.Nature ?? parent.Nature;
    this["Variant of"] = parent.$id;
    this.Tags = json.Tags;
  }
}
