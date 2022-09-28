/**
 * @public
 */
export interface AssetUsage {
  /**
   * Whether the asset's abilities are shared with Allies.
   *
   * If set to `true`, the asset's abilities can be invoked by **any** player character; if your app facilitates co-op or guided play, consider how you might expose these abilities to players other than the asset's owner.
   *
   * Defaults to `true` for Command Vehicle, Support Vehicle, and Module assets.
   */
  Shared: boolean
}
