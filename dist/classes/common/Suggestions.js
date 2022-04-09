import { GameObject } from "../index.js";
export class Suggestions {
    constructor(data) {
        if (data["Game objects"]) {
            this["Game objects"] = data["Game objects"].map(gameObjData => new GameObject(gameObjData));
        }
        if (data["Oracle rolls"]) {
            this["Oracle rolls"] = data["Oracle rolls"];
        }
        if (data.Moves) {
            this.Moves = data.Moves;
        }
        if (data.Assets) {
            this.Assets = data.Assets;
        }
    }
}
//# sourceMappingURL=Suggestions.js.map