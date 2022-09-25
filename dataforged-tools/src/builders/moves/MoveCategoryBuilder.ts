import { DisplayBuilder , MoveBuilder , SourceBuilder , TitleBuilder } from "@builders";
import type { Display, Gamespace , Move, MoveCategory, Source, Title } from "@schema_json";
import type { YamlMoveCategory } from "@schema_yaml";
import { formatId } from "@utils";
import _ from "lodash-es";

/**
 * @internal
 */
export class MoveCategoryBuilder implements MoveCategory {
  $id: MoveCategory["$id"];
  Title: Title;
  Source: Source;
  Description: string;
  Moves: {[key: string]:Move};
  Display: Display;
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