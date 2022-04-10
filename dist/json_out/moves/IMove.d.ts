import type { AssetId, IHasDisplay, IHasId, IHasName, IHasSource, IHasSuggestions, IHasText, IMoveOutcomes, MoveCategoryId, MoveId, OracleTableId } from "../index.js";
import type { IMoveTrigger } from "./IMoveTrigger.js";
/**
 * Interface representing a Starforged move.
 */
export interface IMove extends IHasId<MoveId>, IHasName, IHasText, IHasDisplay, IHasSource, Partial<IHasSuggestions> {
    /**
     * @example `"Moves/Adventure/Face_Danger"`
     */
    $id: MoveId;
    /**
     * @example `"Face Danger"`
     */
    Name: string;
    /**
     * The ID of the parent Asset of the move, if any.
     */
    Asset?: AssetId | undefined;
    /**
     * The ID of the move's category.
     * @example `"Moves/Adventure"`
     */
    Category: MoveCategoryId;
    /**
     * Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.
     */
    "Progress Move"?: boolean | undefined;
    /**
     * The ID of the move that this move is a variant of, if any.
     */
    "Variant of"?: MoveId | undefined;
    /**
     * The move's trigger data.
     */
    Trigger: IMoveTrigger;
    /**
     * The IDs of any oracles *directly* referenced by the move.
     */
    Oracles?: OracleTableId[] | undefined;
    /**
     * Outcome information for the move.
     */
    Outcomes?: IMoveOutcomes | undefined;
}
//# sourceMappingURL=IMove.d.ts.map