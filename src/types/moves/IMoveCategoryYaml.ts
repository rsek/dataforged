import type IMove from "./interfaces/IMove";
import type MoveCategoryName from "./MoveCategoryName";
import type ISource from "../general/interfaces/ISource";
import type MdString from "../general/MdString";


export default interface IMoveCategoryYaml {
  Name: MoveCategoryName;
  Source: ISource;
  Description: MdString;
  Moves: IMove[];
}
