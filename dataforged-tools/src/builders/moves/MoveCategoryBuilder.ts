import { DisplayBuilder , MoveBuilder , SourceBuilder , TitleBuilder } from "@builders";
import type { Gamespace , MoveCategory, Source } from "@schema_json";
import { formatId } from "@utils";
import type { YamlMoveCategory } from "@schema_yaml";
import _ from "lodash-es";

/**
 * @internal
 */
export class MoveCategoryBuilder implements MoveCategory {
  $id: MoveCategory["$id"];
  Title: TitleBuilder;
  Source: SourceBuilder;
  Description: string;
  Moves: {[key: string]:MoveBuilder};
  Display: DisplayBuilder;
  Optional: boolean;
  constructor(json: YamlMoveCategory, gamespace: Gamespace, ...ancestorSourceJson: Source[]) {
    if (!json.Title.Canonical) {
      throw new Error(`Missing a title field: ${JSON.stringify(json)}`);
    }
    const fragment = json._idFragment ?? json.Title.Canonical;
    this.$id = formatId(fragment, gamespace, "Moves");
    this.Title = new TitleBuilder(json.Title, this);
    this.Description = json.Description;
    this.Source = new SourceBuilder(json.Source ?? {}, ...ancestorSourceJson);
    this.Display = new DisplayBuilder(json.Display ?? {});
    this.Optional = json.Optional ?? false;
    this.Moves = _.mapValues(json.Moves,move => {
      move.Category = this.$id;
      return new MoveBuilder(move, this, gamespace,this.Source, ...ancestorSourceJson);
    });
  }
}