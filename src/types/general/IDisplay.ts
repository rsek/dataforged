import type { ImageUrl, Raster, Vector } from "./Url.js";

export default interface IDisplay {
  Title: string;
  Icon?: ImageUrl<Vector> | undefined;
  Images?: ImageUrl<Raster>[] | undefined;
  Color?: string;
}
