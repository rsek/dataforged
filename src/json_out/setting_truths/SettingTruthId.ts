import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { SettingTruthIdFragment } from "@json_out/setting_truths/SettingTruthName.js";

/**
 * A valid ID for a SettingTruth object.
 * @see {@link ISettingTruth}
 */
export type SettingTruthId = `${Gamespace}/Setting_Truths/${SettingTruthIdFragment}`;
