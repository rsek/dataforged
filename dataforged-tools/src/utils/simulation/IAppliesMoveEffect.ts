import type { IOutcomeEffectHash } from "@utils/simulation/NumericOutcomes.js";

export interface IAppliesMoveEffect {
  applyResult(data: IOutcomeEffectHash): void;
}