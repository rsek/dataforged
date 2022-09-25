import { DisplayBuilder , SourceBuilder, SuggestionsBuilder , TitleBuilder , TruthOptionBuilder } from "@builders";
import type { Display, Gamespace , Source, Suggestions, Title, Truth, TruthOption } from "@schema_json";
import type { YamlTruth } from "@schema_yaml";
import { formatId } from "@utils";
import { buildLog } from "@utils/logging/buildLog.js";

/**
 * @internal
 */
export class TruthBuilder implements Truth {
  $id: Truth["$id"];
  Title: Title;
  Table: TruthOption[];
  Character: string;
  Suggestions?: Suggestions | undefined;
  Display: Display;
  Source: Source;
  constructor(json: YamlTruth, sourceJson: Source, gamespace: Gamespace) {
    const fragment = json._idFragment ?? json.Title.Canonical;
    this.$id = formatId(fragment, gamespace, "Setting_Truths");
    buildLog(this.constructor,`Building: ${this.$id}`);
    this.Title = new TitleBuilder(json.Title, this);
    this.Table = json.Table.map(row => new TruthOptionBuilder(this.$id, row));
    this.Display = new DisplayBuilder({
      Icon: json.Display?.Icon
    });
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new SuggestionsBuilder(json.Suggestions) : undefined;
    this.Source = new SourceBuilder(json.Source ?? {}, sourceJson);
  }
}