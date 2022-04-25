import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AssetAbilityIdBase, IHasId, IMove } from "@json_out/index.js";
import type { IMoveOutcomes } from "@json_out/moves/IMoveOutcomes.js";
import type { IMoveTrigger } from "@json_out/moves/IMoveTrigger.js";
import type { StubBy } from "@utils/index.js";
/**
 * @public
 */
export type AlterMoveId = `${Gamespace}/${AlterMoveIdBase}`;
/**
 * @public
 */
export type AlterMoveIdBase = `${AssetAbilityIdBase}/Alter_Moves/${number}`;
/**
 * @public
 */
export interface IAlterMove extends StubBy<IMove, "Trigger"|"Text", "$id"|"Outcomes">, IHasId<AlterMoveId> {
  /**
   * The `$id`s of the move(s) to be altered. If it's `null`, it can alter *any* move to which its trigger conditions apply.
   */
  Moves: IMove["$id"][] | null;
  /**
   * The trigger required by the asset ability. If `undefined`, the move alteration always applies to the specified moves.
   */
  Trigger?: IMoveTrigger | undefined;
  /**
   * Markdown rules text describing added effects which apply *before* the move is rolled, such as adds.
   */
  Text?: string | undefined;
  /**
   * Added rules text that applies on move outcomes.
   */
  Outcomes?: Partial<IMoveOutcomes> | undefined;
}
