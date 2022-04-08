

export type Url = `${Protocol}://${string}`;

export type Protocol = "http" | "https";

export type Raster = "webp";

export type Vector = "svg";

export type ImageType = Vector | Raster;

export type ImageUrl<T extends ImageType> = `${Url}.${T}`;