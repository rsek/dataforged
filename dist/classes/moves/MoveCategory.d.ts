import { Move, Source } from "../index.js";
import type { IDisplay, ISource, MoveCategoryId, MoveCategoryName, MoveCategoryTitle } from "../../json_out/index.js";
import type { IMoveCategory } from "../../json_out/moves/IMoveCategory.js";
import type { IMoveCategoryYaml } from "../../yaml_in/moves/IMoveCategoryYaml.js";
/**
 * @internal
 */
export declare class MoveCategoryDisplay implements IDisplay {
    Title: MoveCategoryTitle;
    Color: string;
    constructor(title: MoveCategoryTitle, color: string);
}
export declare class MoveCategory implements IMoveCategory {
    $id: MoveCategoryId;
    Name: MoveCategoryName;
    Source: Source;
    Description: string;
    Moves: Move[];
    Display: MoveCategoryDisplay;
    constructor(json: IMoveCategoryYaml, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=MoveCategory.d.ts.map