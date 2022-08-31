import { Display, Move, Source, Title } from "../index.js";
import type { Gamespace, IMoveCategory, ISource } from "../../json_out/index.js";
import type { IMoveCategoryYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class MoveCategory implements IMoveCategory {
    $id: IMoveCategory["$id"];
    Title: Title;
    Source: Source;
    Description: string;
    Moves: Move[];
    Display: Display;
    Optional: boolean;
    constructor(json: IMoveCategoryYaml, gamespace: Gamespace, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=MoveCategory.d.ts.map