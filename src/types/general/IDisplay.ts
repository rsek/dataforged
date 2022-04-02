import type UrlString from "./UrlString.js";

export default interface IDisplay {
  Title: string;
  Images?: UrlString[] | undefined;
  Color?: string;
}
