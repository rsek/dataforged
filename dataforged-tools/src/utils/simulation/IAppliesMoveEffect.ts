import type { OutcomeEffectHash } from "@utils/simulation/NumericOutcomes.js";

export interface AppliesMoveEffect { AppliesMoveEffect
  applyResult(data: IOutcomeEffectHash): void;
}