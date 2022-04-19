import type { Gamespace } from "../common/Gamespace.js";
import type { AssetAbilityIdBase, IHasId, IMove } from "../index.js";
import type { IMoveTrigger } from "../moves/IMoveTrigger.js";
/**
 * @public
 */
export declare type AlterMoveId = `${Gamespace}/${AlterMoveIdBase}`;
/**
 * @public
 */
export declare type AlterMoveIdBase = `${AssetAbilityIdBase}/Alter_Moves/${number}`;
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
//# sourceMappingURL=IAlterMove.d.ts.map