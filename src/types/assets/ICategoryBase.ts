import type IDisplay from "../general/IDisplay.js";
import type ISource from "../general/interfaces/ISource.js";
import type MdString from "../general/MdString.js";

export default interface ICategoryBase {
  $id: string;
  Name: string;
  Aliases?: string[] | undefined;
  Description: MdString;
  Source: ISource;
  Display: Partial<IDisplay>;
}