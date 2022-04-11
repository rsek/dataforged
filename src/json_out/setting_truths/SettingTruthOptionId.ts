import type { SettingTruthId } from "@json_out/setting_truths/SettingTruthId";

/**
 * A valid setting truth option ID.
 */
export type SettingTruthOptionId = `${SettingTruthId}/${number}-${number}`;
