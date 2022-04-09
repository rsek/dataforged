import type { AssetId, IHasDisplay, IHasId, IHasName, IHasSource, IHasSuggestions, IHasText, IMoveOutcomes, MoveCategoryId, MoveId, OracleTableId } from "@dataforged/json_out/index.js";
import type { IMoveTrigger } from "../../../dist/json_out/moves/IMoveTrigger.js";
export interface IMove extends IHasId<MoveId>, IHasName, IHasText, IHasDisplay, IHasSource, Partial<IHasSuggestions> {
    Asset?: AssetId | undefined;
    Category: MoveCategoryId;
    "Progress Move"?: boolean | undefined;
    "Variant of"?: MoveId | undefined;
    Trigger: IMoveTrigger;
    Oracles?: OracleTableId[] | undefined;
    Outcomes?: IMoveOutcomes | undefined;
}
//# sourceMappingURL=IMove.d.ts.map