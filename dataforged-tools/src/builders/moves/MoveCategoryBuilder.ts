import { DisplayBuilder, MoveBuilder, SourceBuilder, TitleBuilder } from "@builders";
import type { Display , Game, Move, MoveCategory, Source, Title, YamlMoveCategory } from "@schema";
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
  constructor(json: YamlMoveCategory, game: Game, ...ancestorSourceJson: Source[]) {
    if (!json.Title.Canonical) {
      throw new Error(`Missing a title field: ${JSON.stringify(json)}`);
    }
    const fragment = json._idFragment ?? json.Title.Canonical;
    this.$id = formatId(fragment, game, "Moves");
    this.Title = new TitleBuilder(json.Title, this);
    this.Description = json.Description;
    this.Source = new SourceBuilder(json.Source ?? {}, ...ancestorSourceJson);
    this.Display = new DisplayBuilder(json.Display ?? {});
    this.Optional = json.Optional ?? false;
    this.Moves = _.mapValues(json.Moves,move => {
      move.Category = this.$id;
      return new MoveBuilder(move, this, game,this.Source, ...ancestorSourceJson);
    });
  }
}