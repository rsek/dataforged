

type Url = `${Protocol}://${string}`;
export default Url;
type Protocol = "http" | "https";

export type Raster = "webp";

export type Vector = "svg";

type ImageType = Vector | Raster;

export type ImageUrl<T extends ImageType> = `${Url}.${T}`;