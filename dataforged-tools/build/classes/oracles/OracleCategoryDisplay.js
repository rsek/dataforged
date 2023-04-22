/**
 * @internal
 */
export class OracleCategoryDisplay {
    constructor(json, parentName) {
        this.Title = json.Title ?? parentName;
        this.Icon = json.Icon;
        this.Color = json.Color;
        this.Images = json.Images;
    }
}
//# sourceMappingURL=OracleCategoryDisplay.js.map