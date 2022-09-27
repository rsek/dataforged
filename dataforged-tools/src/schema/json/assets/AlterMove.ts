import type { Move, MoveOutcome, MoveTrigger, OutcomeMiss, Outcomes, OutcomeStrongHit, OutcomeWeakHit } from "@schema";
import type { PartialDeep, StubExcept } from "@utils";

/**
 * Describes alterations applied to moves by asset abilities.
 * @public
 */
export interface AlterMove extends StubExcept<Move, "$id", "Outcomes"> {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[1-9][0-9]*$
   */
  $id: string;
  /**
   * The `$id`s of the move(s) to be altered. If it's `null`, it can alter *any* move to which its trigger conditions apply. If it's `undefined`, see `Extends` instead.
   * @nullable
   */
  Moves?: Move["$id"][] | null | undefined;
  /**
   * Some asset abilities alter/extend other asset abilities, specified as an array of IDs. Only changed properties are specified; other properties are the same.
   */
  Alters?: AlterMove["$id"][] | undefined;
  /**
   * The trigger required by the asset ability. If `undefined`, the move alteration applies to all uses of the specified moves, so long as they also meet any implicit asset requirements (fictional framing, `Asset.Requirement`, not being Broken or Out of Action, etc).
   */
  Trigger?: MoveTrigger | undefined;
  /**
   * Markdown rules text describing added effects which apply *before* the move is rolled, such as adds.
   * @localize
   */
  Text?: string | undefined;
  /**
   * Added rules text that applies on move outcomes.
   */
  Outcomes?: AlterMoveOutcomes | undefined;
}

/**
 * @public
 */
export interface AlterMoveOutcomes extends Omit<Outcomes, keyof typeof MoveOutcome> {
  "Strong hit"?: AlterStrongHit | undefined;
  "Weak hit"?: AlterWeakHit | undefined;
  Miss?: AlterMiss | undefined;
}

/**
 * @public
 */
export interface AlterStrongHit extends PartialDeep<OutcomeStrongHit> {}
/**
 * @public
 */
export interface AlterWeakHit extends PartialDeep<OutcomeWeakHit> {}
/**
 * @public
 */
export interface AlterMiss extends PartialDeep<OutcomeMiss> {}