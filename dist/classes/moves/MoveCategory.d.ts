import { Source } from "../../../dist/classes/common/Source.js";
import { Move } from "../../../dist/classes/moves/Move.js";
import type { IDisplay, ISource, MoveCategoryId, MoveCategoryName, MoveCategoryTitle, ParagraphsString } from "../../../dist/json_out/index.js";
import type { IMoveCategoryYaml } from "../../../dist/yaml_in/moves/IMoveCategoryYaml.js";
export declare class MoveCategoryDisplay implements IDisplay {
    Title: MoveCategoryTitle;
    Color: string;
    constructor(title: MoveCategoryTitle, color: string);
}
export declare class MoveCategory implements IMoveCategoryYaml {
    $id: MoveCategoryId;
    Name: MoveCategoryName;
    Source: Source;
    Description: ParagraphsString;
    Moves: Move[];
    Display: MoveCategoryDisplay;
    constructor(json: IMoveCategoryYaml, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=MoveCategory.d.ts.map