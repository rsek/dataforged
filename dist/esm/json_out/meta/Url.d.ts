/**
 * @public
 */
export declare type Url = `${Protocol}://${string}`;
/**
 * @public
 */
export declare type Protocol = "http" | "https";
/**
 * @public
 */
export declare type Raster = "webp";
/**
 * @public
 */
export declare type Vector = "svg";
/**
 * @public
 */
export declare type ImageType = Vector | Raster;
/**
 * @public
 */
export declare type ImageUrl<T extends ImageType> = `${Url}.${T}`;
//# sourceMappingURL=Url.d.ts.map