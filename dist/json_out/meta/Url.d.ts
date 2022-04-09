export declare type Url = `${Protocol}://${string}`;
export declare type Protocol = "http" | "https";
export declare type Raster = "webp";
export declare type Vector = "svg";
export declare type ImageType = Vector | Raster;
export declare type ImageUrl<T extends ImageType> = `${Url}.${T}`;
//# sourceMappingURL=Url.d.ts.map