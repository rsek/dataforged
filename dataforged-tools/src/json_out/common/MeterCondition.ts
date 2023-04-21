/**
 * Conditions (such as impacts) that can apply to asset cards with condition meters. These are typically presented as tick boxes on the asset card.
 * @public
 */
export enum MeterCondition {
  /**
   * Battered may be marked when your vehicle is at 0 integrity and you fail to Withstand Damage. The vehicle is barely holding together.
   * @page 51
   */
  Battered = "Battered",
  /**
   * Cursed may be marked when your command vehicle (STARSHIP asset) is at 0 integrity and you fail to Withstand Damage. This is a permanent impact. Your ship will never be quite right again.
   * @page 51
   */
  Cursed = "Cursed",
  /**
   * When your companion’s health is at 0 and you score a miss, they are out of action. You cannot leverage their support until they gain at least +1 health. Envision what this means in the fiction of your scene.
   * @page 204
   */
  OutOfAction = "Out of Action",
  /** Used by "Fleet Commander" asset */
  Wrecked = "Wrecked"
}
