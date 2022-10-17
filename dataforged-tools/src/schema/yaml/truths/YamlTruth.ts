import type { TruthOptionStarforged, TruthOptionSubtableRowStarforged, TruthStarforged, YamlRollTemplate, YamlStub, YamlStubNode, YamlSuggestions, YamlTitleCaseTitle } from '@schema'

/**
 * @internal
 */
export interface YamlTruthStarforged extends YamlStubNode<TruthStarforged, '', 'table'> {
  suggestions?: YamlSuggestions | undefined
  table: YamlTruthOptionStarforged[]
  title: YamlTitleCaseTitle
}

/**
 * @internal
 */
export interface YamlTruthOptionStarforged<C extends number | null = number | null, F extends number | null = number | null> extends YamlStub<TruthOptionStarforged<C, F>, '', 'subtable' | 'roll_template'> {
  subtable?: YamlTruthOptionStarforgedSubtableRow[] | undefined
  roll_template?: YamlRollTemplate | undefined
}

/**
 * @internal
 */
export interface YamlTruthOptionStarforgedSubtableRow<C extends number | null = number | null, F extends number | null = number | null> extends YamlStub<TruthOptionSubtableRowStarforged<C, F>, '', 'roll_template'> {
  roll_template?: YamlRollTemplate | undefined
}
