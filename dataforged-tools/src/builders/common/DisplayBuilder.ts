import type { Display } from '@schema'
/**
 * @internal
 */
export class DisplayBuilder implements Display {
  Icon?: string | undefined
  Images?: string[] | undefined
  Color?: string | undefined
  constructor ({ Icon, Images, Color }: Display) {
    this.Icon = Icon
    this.Images = Images
    this.Color = Color
  }
}
