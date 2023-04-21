
/**
 * @internal
 * @asType string
 */
export type Url = `https://${string}`

/**
 * @internal
 * @asType string
 */
export type Raster = 'webp'
/**
 * @internal
 * @asType string
 */
export type Vector = 'svg'
/**
 * @internal
 * @asType string
 */
export type ImageType = Vector | Raster
/**
 * @internal
 * @asType string
 */
export type ImageUrl<T extends ImageType> = `${Url}.${T}`
