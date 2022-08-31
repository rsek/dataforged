import { Display } from "@classes/common/Display.js";
import { Source } from "@classes/common/Source.js";
import { Title } from "@classes/common/Title.js";
import type { IAsset } from "@json_out/index.js";
import type { IDelveRarity } from "@json_out/rarities/IDelveRarity.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import { ITitleYaml } from "@yaml_in/index.js";
import type { IDelveRarityYaml } from "@yaml_in/rarities";

/**
 * @internal
 */
export class DelveRarity implements IDelveRarity {
  $id: string;
  "XP Cost": number;
  Asset: IAsset["$id"];
  Title: Title;
  Display: Display;
  Source: Source;
  Description: string;
  constructor(json: IDelveRarityYaml) {
    this.$id = "Ironsworn/Rarities/" + formatIdFragment(json._idFragment??json.Title.Canonical);
    this["XP Cost"] = json["XP Cost"];
    this.Asset = json.Asset;
    this.Title = new Title(json.Title, this);
    this.Source = new Source(json.Source ?? {});
    this.Display = new Display({});
    this.Description = json.Description;
  }
}
