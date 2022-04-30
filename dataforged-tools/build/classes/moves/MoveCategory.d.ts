import { Move, Source } from "../index.js";
import { MoveCategoryDisplay } from "./MoveCategoryDisplay.js";
import type { Gamespace } from "../../json_out/common/Gamespace.js";
import type { ISource, MoveCategoryName } from "../../json_out/index.js";
import type { IMoveCategory } from "../../json_out/moves/IMoveCategory.js";
import type { IMoveCategoryYaml } from "../../yaml_in/moves/IMoveCategoryYaml.js";
/**
 * @internal
 */
export declare class MoveCategory implements IMoveCategory {
    $id: IMoveCategory["$id"];
    Name: MoveCategoryName;
    Source: Source;
    Description: string;
    Moves: Move[];
    Display: MoveCategoryDisplay;
    constructor(json: IMoveCategoryYaml, gamespace: Gamespace, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=MoveCategory.d.ts.map