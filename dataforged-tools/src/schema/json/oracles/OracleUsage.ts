import type { MixinRequirements, MixinRollTemplate, MixinSuggestions, Requirements, Suggestions } from '@schema'
import type { AttributeMap } from '@utils'

/**
 * Describes the recommended usage of this item.
 * @public
 */
export interface OracleUsage extends Partial<MixinRequirements & MixinSuggestions & MixinRollTemplate> {
  /**
   * Whether this table should be included in the initial oracle rolls when generating a game object. This is a somewhat arbitrary recommendation, and may not be appropriate for all implementations (or all game situations). Rather it's a reasonable starting point in *most* cases.
   *
   * That said, the game itself recommends **against** rolling all possible results at once (see "Peeling the Onion", p. 293, *Starforged*). If your goal is to implement the game 'as-written', consider how you might include some means of "progressive disclosure" of oracle results.
   *
   * May be deprecated in the future in favour of dedicated object template information.
   */
  initial?: boolean | undefined
  suggestions?: Suggestions | undefined
  requires?: Requirements | undefined
  /**
   * The maximum number of rolls when using this oracle to create a game object. Assume it's 1 if not specified.
   */
  'max_rolls'?: number | undefined
  /**
   * Whether the table's standard use is iterative.  Common examples are Feature, Opportunity, and Peril tables, which are most often used repeatedly to describe different areas of/events in a place, rather than being assigned as a description of the place as a whole.
   *
   * Mutually exclusive with `Max rolls`. If undefined, assume `false`.
   */
  repeatable?: boolean | undefined
  /**
   * Whether multiple rolls (as in object generation, or with {@link MultipleRolls}) are allowed.
   */
  allow_duplicates?: boolean | undefined
  /**
   * Hints which attributes are set by this table.
   */
  sets_attributes?: AttributeMap | undefined
}
