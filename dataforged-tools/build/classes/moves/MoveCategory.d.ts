import { Move, Source } from "../index.js";
import { MoveCategoryDisplay } from "./MoveCategoryDisplay.js";
import type { Gamespace, IMoveCategory, ISource } from "../../json_out/index.js";
import type { IMoveCategoryYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class MoveCategory implements IMoveCategory {
    $id: IMoveCategory["$id"];
    Name: string;
    Source: Source;
    Description: string;
    Moves: Move[];
    Display: MoveCategoryDisplay;
    constructor(json: IMoveCategoryYaml, gamespace: Gamespace, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=MoveCategory.d.ts.map