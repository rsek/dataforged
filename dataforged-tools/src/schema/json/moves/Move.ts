import type { Asset, HasDisplay, HasId, HasOptional, HasSource, HasSuggestions, HasText, HasTitle, MoveCategory, MoveTrigger, OracleTable, Outcomes, TitleCaseTitle } from "@schema";

/**
 * Interface representing a Starforged move.
 * @public
 */
export interface Move extends HasId, HasText, HasDisplay, HasSource, HasOptional, HasTitle,Partial<HasSuggestions> {
  /**
   * @example "starforged/moves/adventure/face_danger"
   * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3])/[a-z_-]+$
   */
  $id: string;
  /**
   * Note the "Canonical" key for asset-specific moves is something of a misnomer, as in the original text doesn't name them. They're provided in the same format for convenience, however.
   * @see HasTitle
   * @example
   * ```json
   * {"Canonical": "Face Danger"}
   * ```
   */
  Title: TitleCaseTitle
  /**
   * The ID of the parent Asset of the move, if any.
   */
  Asset?: Asset["$id"] | undefined;
  /**
   * The ID of the move's category.
   * @example "starforged/moves/adventure"
   */
  Category: MoveCategory["$id"];
  /**
   * Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.
   */
  "Progress move"?: boolean | undefined;
  /**
   * The ID of the move that this move is a variant of, if any.
   */
  "Variant of"?: Move["$id"] | undefined;
  /**
   * The move's trigger data.
   */
  Trigger: MoveTrigger;
  /**
   * The IDs of any oracles directly referenced by the move, or vice versa.
   */
  Oracles?: OracleTable["$id"][] | undefined;
  /**
   * Outcome information for the move.
   */
  Outcomes?: Outcomes | undefined;
  Tags?: string[] | undefined;
}
