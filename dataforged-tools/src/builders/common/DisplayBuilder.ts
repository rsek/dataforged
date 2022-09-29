import type { Display } from '@schema'
/**
 * @internal
 */
export class DisplayBuilder implements Display {
  icon?: string | undefined
  images?: string[] | undefined
  color?: string | undefined
  constructor ({ icon: Icon, images: Images, color: Color }: Display) {
    this.icon = Icon
    this.images = Images
    this.color = Color
  }
}
