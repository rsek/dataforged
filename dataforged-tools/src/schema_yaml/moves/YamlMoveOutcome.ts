import type { MoveOutcome, MoveOutcomes, MoveReroll, OutcomeInfoBase, OutcomeMiss, OutcomeMissMatch, OutcomeStrongHit, OutcomeStrongHitMatch, OutcomeWeakHit } from "@schema_json";
import type { YamlStub } from "@schema_yaml";

/**
 * @internal
 */
export interface YamlMoveOutcomes extends YamlStub<MoveOutcomes, "", keyof typeof MoveOutcome> {
  "Strong Hit": YamlOutcomeStrongHit;
  "Weak Hit": YamlOutcomeWeakHit;
  "Miss": YamlOutcomeMiss;
}

/**
 * @internal
 */
export interface YamlOutcomeInfoBase<O extends MoveOutcome> extends YamlStub<OutcomeInfoBase<O>, "","With a Match"|"Reroll"> {
  "With a Match"?: YamlOutcomeInfoBase<O> | undefined;
  Reroll?: YamlMoveReroll | undefined

 }

/**
 * @internal
 */
export interface YamlMoveReroll extends YamlStub<MoveReroll> {}

/**
 * @internal
 */
export interface YamlOutcomeMiss extends YamlOutcomeInfoBase<0>, YamlStub<OutcomeMiss,"", "With a Match"|"Reroll"> {
  "With a Match"? : YamlOutcomeMissMatch | undefined;
}
/**
 * @internal
 */
export interface YamlOutcomeMissMatch extends YamlOutcomeInfoBase<0>, YamlStub<OutcomeMissMatch, "", "Reroll"> { }

/**
 * @internal
 */
export interface YamlOutcomeStrongHit extends YamlOutcomeInfoBase<2>, YamlStub<OutcomeStrongHit,"", "With a Match"|"Reroll"> {
  "With a Match"? : YamlOutcomeStrongHitMatch | undefined;
}
/**
 * @internal
 */
export interface YamlOutcomeStrongHitMatch extends YamlOutcomeInfoBase<2>, YamlStub<OutcomeStrongHitMatch, "", "Reroll"> { }


/**
 * @internal
 */
export interface YamlOutcomeWeakHit extends YamlOutcomeInfoBase<1>, YamlStub<OutcomeWeakHit,"", "With a Match"|"Reroll"> {
}