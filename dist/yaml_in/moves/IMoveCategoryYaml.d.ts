import type { IDisplay, IMove, ISource, MoveCategoryName, ParagraphsString } from "../../json_out/index.js";
import type { RequireKey } from "../../utils/types/RequireKey.js";
export interface IMoveCategoryYaml {
    Name: MoveCategoryName;
    Source: ISource;
    Description: ParagraphsString;
    Moves: IMove[];
    Display: RequireKey<IDisplay, "Color">;
}
//# sourceMappingURL=IMoveCategoryYaml.d.ts.map