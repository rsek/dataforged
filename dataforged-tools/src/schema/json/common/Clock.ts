

export interface Clock {
  'Clock type': ClockType
  /**
   * An integer representing the total number of segments in this Clock. *Ironsworn: Starforged* uses clocks with 4, 6, 8, and 10 segments.
   *
   * `Filled` should not exceed this number.
   */
  Segments: ClockSegments
  /**
   * An integer representing how many filled segments this clock has. This is always 0 in Dataforged; it's included to make it easy to store clock states with the same interface.
   */
  Filled: number
}

/**
 * @public
 */
export enum ClockSegments {
  Four = 4,
  Six = 6,
  Eight = 8,
  Ten = 10
}
/**
 * See clocks (p. 234) for more information.
 * @public
 */
export enum ClockType {
  Tension = 'tension',
  Campaign = 'campaign'
}