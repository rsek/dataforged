import type { Truth, TruthOption, TruthOptionSubtableRow, YamlRollTemplate , YamlStub, YamlStubNode, YamlSuggestions } from "@schema";

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