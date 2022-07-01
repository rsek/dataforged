
/**
 * @internal
 * @asType string
 */
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
//License: MIT
export type Url = `${Protocol}://${string}`;
/**
 * @internal
 * @asType string
 */
export type Protocol = "http" | "https";
/**
 * @internal
 * @asType string
 */
export type Raster = "webp";
/**
 * @internal
 * @asType string
 */
export type Vector = "svg";
/**
 * @internal
 * @asType string
 */
export type ImageType = Vector | Raster;
/**
 * @internal
 * @asType string
 */
export type ImageUrl<T extends ImageType> = `${Url}.${T}`;