/**
 * @internal
 * @asType string
 */
export declare type Url = `${Protocol}://${string}`;
/**
 * @internal
 * @asType string
 */
export declare type Protocol = "http" | "https";
/**
 * @internal
 * @asType string
 */
export declare type Raster = "webp";
/**
 * @internal
 * @asType string
 */
export declare type Vector = "svg";
/**
 * @internal
 * @asType string
 */
export declare type ImageType = Vector | Raster;
/**
 * @internal
 * @asType string
 */
export declare type ImageUrl<T extends ImageType> = `${Url}.${T}`;
//# sourceMappingURL=Url.d.ts.map