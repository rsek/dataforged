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
  constructor(yaml: YamlMoveCategory, game: Game, ...ancestorSourceJson: Source[]) {
    if (!yaml.Title.Canonical) {
      throw new Error(`Missing a title field: ${JSON.stringify(yaml)}`);
    }
    const fragment = yaml._idFragment ?? yaml.Title.Canonical;
    this.$id = formatId(fragment, game, "Moves");
    this.Title = new TitleBuilder(yaml.Title, this);
    this.Description = yaml.Description;
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(game), ...ancestorSourceJson);
    this.Display = new DisplayBuilder(yaml.Display ?? {});
    this.Optional = yaml.Optional ?? false;
    this.Moves = _.mapValues(yaml.Moves,move => {
      move.Category = this.$id;
      return new MoveBuilder(move, this, game,this.Source, ...ancestorSourceJson);
    });
  }
}