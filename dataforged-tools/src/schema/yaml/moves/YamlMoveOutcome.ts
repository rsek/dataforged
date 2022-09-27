import type { MoveOutcome , MoveReroll, OutcomeBase, OutcomeMiss, OutcomeMissMatch, Outcomes, OutcomeStrongHit, OutcomeStrongHitMatch, OutcomeWeakHit, YamlStub } from "@schema";

/**
 * @internal
 */
export interface YamlOutcomes extends YamlStub<Outcomes, "", keyof typeof MoveOutcome> {
  "Strong hit": YamlOutcomeStrongHit;
  "Weak hit": YamlOutcomeWeakHit;
  "Miss": YamlOutcomeMiss;
}

/**
 * @internal
 */
export interface YamlOutcome<O extends MoveOutcome> extends YamlStub<OutcomeBase<O>, "","With a match"|"Reroll"> {
  "With a match"?: YamlOutcome<O> | undefined;
  Reroll?: YamlMoveReroll | undefined

 }

/**
 * @internal
 */
export interface YamlMoveReroll extends YamlStub<MoveReroll> {}

/**
 * @internal
 */
export interface YamlOutcomeMiss extends YamlOutcome<0>, YamlStub<OutcomeMiss,"", "With a match"|"Reroll"> {
  "With a match"? : YamlOutcomeMissMatch | undefined;
}
/**
 * @internal
 */
export interface YamlOutcomeMissMatch extends YamlOutcome<0>, YamlStub<OutcomeMissMatch, "", "Reroll"> { }

/**
 * @internal
 */
export interface YamlOutcomeStrongHit extends YamlOutcome<2>, YamlStub<OutcomeStrongHit,"", "With a match"|"Reroll"> {
  "With a match"? : YamlOutcomeStrongHitMatch | undefined;
}
/**
 * @internal
 */
export interface YamlOutcomeStrongHitMatch extends YamlOutcome<2>, YamlStub<OutcomeStrongHitMatch, "", "Reroll"> { }


/**
 * @internal
 */
export interface YamlOutcomeWeakHit extends YamlOutcome<1>, YamlStub<OutcomeWeakHit,"", "With a match"|"Reroll"> {
}