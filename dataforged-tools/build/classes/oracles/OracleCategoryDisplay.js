/**
 * @internal
 */
export class OracleCategoryDisplay {
    constructor(json, parentName) {
        var _a;
        this.Title = (_a = json.Title) !== null && _a !== void 0 ? _a : parentName;
        this.Icon = json.Icon;
        this.Color = json.Color;
        this.Images = json.Images;
    }
}
//# sourceMappingURL=OracleCategoryDisplay.js.map