import { TruthBuilder, TruthClassicBuilder } from "../builders";
import { Gamespace } from "../schema_json";
/**
 * It takes the YAML files that contain the setting truths, and builds a list of SettingTruth objects
 * @returns An array of SettingTruth objects.
 */
export declare function buildTruths<G extends Gamespace>(gamespace: G): {
    [x: string]: TruthClassicBuilder;
} | {
    [x: string]: TruthBuilder;
};
//# sourceMappingURL=buildTruths.d.ts.map