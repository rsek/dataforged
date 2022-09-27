import type { TruthOptionStarforged, TruthOptionSubtableRowStarforged, TruthStarforged, YamlRollTemplate , YamlStub, YamlStubNode, YamlSuggestions } from "@schema";

/**
 * @internal
 */
export interface YamlTruthStarforged extends YamlStubNode<TruthStarforged, "", "Table"> {
  Suggestions?: YamlSuggestions | undefined;
  Table: YamlTruthOptionStarforged[];
}

/**
 * @internal
 */
export interface YamlTruthOptionStarforged extends YamlStub<TruthOptionStarforged, "", "Subtable"|"Roll template"> {
  Subtable?: YamlTruthOptionStarforgedSubtableRow[] | undefined;
  "Roll template"?: YamlRollTemplate | undefined;
}

/**
 * @internal
 */
export interface YamlTruthOptionStarforgedSubtableRow extends YamlStub<TruthOptionSubtableRowStarforged> {}