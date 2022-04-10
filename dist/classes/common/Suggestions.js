import { GameObject } from "../index.js";
/**
 * Object representing "non-canon" suggestions for related Starforged game content. These are intended be offered as convenient shortcuts for the user; having them roll automatically is not recommended. They can be safely ignored if this functionality is not desired.
 */
export class Suggestions {
    constructor(data) {
        if (data["Game objects"]) {
            // console.info("[Suggestions] Game objects", JSON.stringify(data["Game objects"]));
            this["Game objects"] = data["Game objects"].map(gameObjData => new GameObject(gameObjData));
        }
        if (data["Oracle rolls"]) {
            // TODO type check against string
            this["Oracle rolls"] = data["Oracle rolls"];
        }
        if (data.Moves) {
            // TODO type check against string
            this.Moves = data.Moves;
        }
        if (data.Assets) {
            // TODO type check against string
            this.Assets = data.Assets;
        }
    }
}
//# sourceMappingURL=Suggestions.js.map