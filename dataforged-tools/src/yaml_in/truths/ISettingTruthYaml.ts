import type { ISettingTruth, ISettingTruthOption, ISettingTruthOptionSubtableRow } from "@json_out/index.js";
import type { ISuggestionsYaml, YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface ISettingTruthYaml extends YamlStub<ISettingTruth, "Display"|"Source", "Table"> {
  Suggestions?: ISuggestionsYaml | undefined;
  Table: ISettingTruthOptionYaml[];
}

/**
 * @internal
 */
export interface ISettingTruthOptionYaml extends YamlStub<ISettingTruthOption, "", "Subtable"> {
  Subtable?: ISettingTruthOptionSubtableRowYaml[] | undefined;
}

/**
 * @internal
 */
export interface ISettingTruthOptionSubtableRowYaml extends YamlStub<ISettingTruthOptionSubtableRow> {}