import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AssetAbilityIdBase, IHasId, IMove } from "@json_out/index.js";
import type { IMoveTrigger } from "@json_out/moves/IMoveTrigger.js";
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
export interface IAlterMove extends Omit<Partial<IMove>, "$id">, IHasId<AlterMoveId> {
  /**
   * The `$id`s of the move(s) to be altered. If it's `null`, it can alter *any* move to which its trigger conditions apply.
   */
  Moves: IMove["$id"][] | null;
  /**
   * The trigger information to be added to the altered move.
   */
  Trigger?: IMoveTrigger | undefined;
}
