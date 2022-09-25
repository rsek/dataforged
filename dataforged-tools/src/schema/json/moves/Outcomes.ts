import type { HasId, OutcomeMiss, OutcomeStrongHit, OutcomeWeakHit } from "@schema";

/**
 * @public
 */
export interface Outcomes extends HasId {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes$
   */
  $id: string;
  "Strong Hit": OutcomeStrongHit;
  "Weak Hit": OutcomeWeakHit;
  "Miss": OutcomeMiss;
}
