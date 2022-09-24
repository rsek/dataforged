import type { Truth, TruthOption, TruthOptionSubtableRow } from "@schema_json";
import type { YamlRollTemplate, YamlStub , YamlStubNode, YamlSuggestions } from "@schema_yaml";

/**
 * @internal
 */
export interface YamlTruth extends YamlStubNode<Truth, "", "Table"> {
  Suggestions?: YamlSuggestions | undefined;
  Table: YamlTruthOption[];
}

/**
 * @internal
 */
export interface YamlTruthOption extends YamlStub<TruthOption, "", "Subtable"|"Roll template"> {
  Subtable?: YamlTruthOptionSubtableRow[] | undefined;
  "Roll template"?: YamlRollTemplate | undefined;
}

/**
 * @internal
 */
export interface YamlTruthOptionSubtableRow extends YamlStub<TruthOptionSubtableRow> {}