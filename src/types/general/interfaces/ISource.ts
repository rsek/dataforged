import SourceTitle from "../SourceTitle";



export default interface ISource {
  Title: SourceTitle;
  Date?: string | undefined;
  Page?: number | undefined;
}
