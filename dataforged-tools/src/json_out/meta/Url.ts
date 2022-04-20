
/**
 * @public
 */
export type Url = `${Protocol}://${string}`;
/**
 * @public
 */
export type Protocol = "http" | "https";
/**
 * @public
 */
export type Raster = "webp";
/**
 * @public
 */
export type Vector = "svg";
/**
 * @public
 */
export type ImageType = Vector | Raster;
/**
 * @public
 */
export type ImageUrl<T extends ImageType> = `${Url}.${T}`;