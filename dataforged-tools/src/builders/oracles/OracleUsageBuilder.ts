import { NodeBuilder, SuggestionsBuilder } from '@builders'
import type { Oracle, OracleUsage, Requirements, Suggestions, YamlOracleUsage } from '@schema'

/**
 * @internal
 */
// @ts-expect-error
export class OracleUsageBuilder extends NodeBuilder<YamlOracleUsage, OracleUsage, Oracle> implements OracleUsage {
  initial?: boolean | undefined
  max_rolls?: number | undefined
  repeatable?: boolean | undefined
  suggestions?: Suggestions | undefined
  requires?: Requirements | undefined
  allow_duplicates?: boolean | undefined
  // sets_attributes?: AttributeChoices[] | undefined
  constructor (yaml: YamlOracleUsage, parent: Oracle) {
    // @ts-expect-error
    super(yaml, 'usage', parent)
    this.initial = yaml.initial
    this.max_rolls = yaml.max_rolls
    this.repeatable = yaml.repeatable
    this.allow_duplicates = yaml.allow_duplicates ?? false
    if (yaml.suggestions != null) {
      this.suggestions = new SuggestionsBuilder(yaml.suggestions)
    }
    // if (yaml.requires != null) {
    //   this.requires = new RequirementsBuilder(yaml.requires)
    // }
    // this["Sets attributes"] = json["Sets attributes"];
  }
}
