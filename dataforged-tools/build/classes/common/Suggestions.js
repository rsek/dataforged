import { GameObject } from "../index.js";
/**
 * @internal
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