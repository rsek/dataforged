import type { IHasId } from "../index.js";
import type { IOutcomeInfo, MoveOutcome } from "../index.js";
/**
 * @public
 */
export interface IMoveOutcomes extends IHasId {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes$
     */
    $id: string;
    [MoveOutcome.Strong_Hit]: IOutcomeInfo;
    [MoveOutcome.Weak_Hit]: IOutcomeInfo;
    [MoveOutcome.Miss]: IOutcomeInfo;
}
//# sourceMappingURL=IMoveOutcomes.d.ts.map