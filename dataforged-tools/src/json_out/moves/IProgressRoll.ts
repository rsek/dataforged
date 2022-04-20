import type { ProgressType } from "@json_out/common/index.js";

/**
 * @public
 */
export interface IProgressRoll {
  Track?: ProgressType | undefined;
  "All of"?: ProgressType[] | undefined;
  "Best of"?: ProgressType[] | undefined;
  "Worst of"?: ProgressType[] | undefined;
}
