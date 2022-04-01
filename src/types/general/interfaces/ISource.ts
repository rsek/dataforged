import type SourceTitle from "../SourceTitle.js";

export default interface ISource {
  Title: SourceTitle;
  Date?: string | undefined;
  Page?: number | undefined;
}
