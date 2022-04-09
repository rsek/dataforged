import type { IDisplay, IMove, ISource, MoveCategoryName, ParagraphsString } from "@dataforged/json_out/index.js";
import type { RequireKey } from "../../../dist/utils/types/RequireKey.js";
export interface IMoveCategoryYaml {
    Name: MoveCategoryName;
    Source: ISource;
    Description: ParagraphsString;
    Moves: IMove[];
    Display: RequireKey<IDisplay, "Color">;
}
//# sourceMappingURL=IMoveCategoryYaml.d.ts.map