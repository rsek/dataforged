import type { IAsset } from "@json_out/assets/IAsset.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AssetAbilityIdBase, IHasDisplay, IHasId, IHasName, IHasSource, IHasSuggestions , IHasText, IMoveCategory , IMoveOutcomes , MoveCategoryName } from "@json_out/index.js";
import type { IMoveTrigger } from "@json_out/moves/IMoveTrigger.js";
import type { IOracle } from "@json_out/oracles/IOracle.js";
/**
 * @public
 */
export type MoveId = `${Gamespace}/${MoveIdBase}`;
/**
 * @public
 */
export type MoveIdBase = `Moves/${MoveCategoryName|"Assets"}/${string}` | `Moves/${AssetAbilityIdBase}/${string}`;

/**
 * Placeholder Move ID indicating that *any* move is valid. For example, an {@link IAlterMove} with this as a `Move` key can be applied to any move that meets its other requirements.
 * @public
 */
export type MoveIdGeneric = `${Gamespace}/${MoveIdGenericBase}`;

/**
 * @public
 */
export type MoveIdGenericBase = "Moves/*";

/**
 * Interface representing a Starforged move.
 * @public
 */
export interface IMove extends IHasId<MoveId>, IHasName, IHasText, IHasDisplay, IHasSource, Partial<IHasSuggestions> {
  /**
   * @example "Moves/Adventure/Face_Danger"
   */
  $id: MoveId;
  /**
   * @example "Face Danger"
   */
  Name: string;
  /**
   * The ID of the parent Asset of the move, if any.
   */
  Asset?: IAsset["$id"] | undefined;
  /**
   * The ID of the move's category.
   * @example "Moves/Adventure"
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
   * The IDs of any oracles *directly* referenced by the move.
   */
  Oracles?: IOracle["$id"][] | undefined;
  /**
   * Outcome information for the move.
   */
  Outcomes?: IMoveOutcomes | undefined;
}
