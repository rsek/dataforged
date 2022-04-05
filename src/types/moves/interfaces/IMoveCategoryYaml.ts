import type IMove from "./IMove.js";
import type { WithRequired } from "../../assets/WithRequired.js";
import type IDisplay from "../../general/IDisplay.js";
import type ISource from "../../general/interfaces/ISource.js";
import type { ParagraphsString } from "../../general/StringTypes.js";
import type MoveCategoryName from "../MoveCategoryName.js";


export default interface IMoveCategoryYaml {
  Name: MoveCategoryName;
  Source: ISource;
  Description: ParagraphsString;
  Moves: IMove[];
  Display: WithRequired<IDisplay, "Color">
}
