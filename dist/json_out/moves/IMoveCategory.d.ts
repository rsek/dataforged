import type { ParagraphsString } from "../common/MdString.js";
import type { IDisplay } from "../meta/IDisplay.js";
import type { ISource } from "../meta/ISource.js";
import type { IMove } from "./IMove.js";
import type { MoveCategoryId } from "./MoveCategoryId.js";
import type { MoveCategoryName } from "./MoveCategoryName.js";
import type { RequireKey } from "../../utils/types/RequireKey.js";
export interface IMoveCategory {
    $id: MoveCategoryId;
    Name: MoveCategoryName;
    Source: ISource;
    Description: ParagraphsString;
    Moves: IMove[];
    Display: RequireKey<IDisplay, "Color">;
}
//# sourceMappingURL=IMoveCategory.d.ts.map