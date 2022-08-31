import type { Title } from "@classes/index.js";
import type { IAsset , IDisplay, IHasDisplay, IHasId, IHasOptional, IHasSource, IHasSuggestions , IHasText, IHasTitle, IMoveCategory , IMoveOutcomes  , IMoveTrigger , IOracle, ITitle } from "@json_out/index.js";

/**
 * Interface representing a Starforged move.
 * @public
 */
export interface IMove extends IHasId,  IHasText, IHasDisplay, IHasSource, IHasOptional, IHasTitle,Partial<IHasSuggestions> {
  /**
   * @example "Starforged/Moves/Adventure/Face_Danger"
   * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3])/[A-z_-]+$
   */
  $id: string;
  /**
   * @example
   * ```typescript
   * {Canonical: "Face Danger"}
   * ```
   */
  Title: ITitle;
  /**
   * The ID of the parent Asset of the move, if any.
   */
  Asset?: IAsset["$id"] | undefined;
  /**
   * The ID of the move's category.
   * @example "Starforged/Moves/Adventure"
   */
  Category: IMoveCategory["$id"];
  /**
   * Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.
   */
  "Progress Move"?: boolean | undefined;
  /**
   * The ID of the move that this move is a variant of, if any.
   */
  "Variant of"?: IMove["$id"] | undefined;
  /**
   * The move's trigger data.
   */
  Trigger: IMoveTrigger;
  /**
   * The IDs of any oracles directly referenced by the move, or vice versa.
   */
  Oracles?: IOracle["$id"][] | undefined;
  /**
   * Outcome information for the move.
   */
  Outcomes?: IMoveOutcomes | undefined;
  Display: IDisplay;
  Tags?: string[] | undefined;
}
