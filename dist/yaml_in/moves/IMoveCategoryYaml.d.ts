import type { IDisplay, IMove, ISource, MoveCategoryName, ParagraphsString } from "../../json_out/index.js";
import type { IMoveCategory } from "../../json_out/moves/IMoveCategory.js";
import type { RequireKey } from "../../utils/types/RequireKey.js";
export interface IMoveCategoryYaml extends Omit<IMoveCategory, "$id"> {
    Name: MoveCategoryName;
    Source: ISource;
    Description: ParagraphsString;
    Moves: IMove[];
    Display: RequireKey<IDisplay, "Color">;
}
//# sourceMappingURL=IMoveCategoryYaml.d.ts.map