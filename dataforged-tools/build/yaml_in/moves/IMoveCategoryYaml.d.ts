import type { IDisplayWithTitle, IMove, ISource, MoveCategoryName } from "../../json_out/index.js";
import type { IMoveCategory } from "../../json_out/moves/IMoveCategory.js";
export interface IMoveCategoryYaml extends Omit<IMoveCategory, "$id"> {
    Name: MoveCategoryName;
    Source: ISource;
    Description: string;
    Moves: IMove[];
    Display: IDisplayWithTitle;
}
//# sourceMappingURL=IMoveCategoryYaml.d.ts.map