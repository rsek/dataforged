import { Suggestions } from "../index.js";
import { AttributeSetter } from "../index.js";
import { GameObject } from "../index.js";
import { MultipleRolls } from "../index.js";
import { OracleContent } from "../index.js";
import { badJsonError } from "../../utils/logging/badJsonError.js";
import { validateRollTemplate } from "../../utils/validation/validateRollTemplate.js";
import _ from "lodash-es";
import { is } from "typescript-is";
export class Row {
    constructor(parentId, json) {
        let rowData = _.clone(json);
        if (Array.isArray(rowData) && rowData.some(item => Array.isArray(item))) {
            rowData = rowData.flat(2);
        }
        this.Floor = Array.isArray(rowData) ? rowData[0] : rowData.Floor;
        this.Ceiling = Array.isArray(rowData) ? rowData[1] : rowData.Ceiling;
        if ((typeof this.Floor) !== (typeof this.Ceiling)) {
            throw badJsonError(this.constructor, rowData, "Floor and Ceiling must have the same type (either number or null)");
        }
        let rangeString;
        if (this.Floor === null && this.Ceiling === null) {
            rangeString = "--";
        }
        else {
            if (this.Floor === null || this.Ceiling === null) {
                throw new Error();
            }
            rangeString = this.Floor === this.Ceiling ? `${this.Ceiling}` : `${this.Floor}-${this.Ceiling}`;
            this.$id = `${parentId} / ${rangeString}`;
        }
        const rowContents = Array.isArray(rowData) ? rowData.slice(2) : [_.omit(rowData, ["Floor", "Ceiling"])];
        rowContents.forEach(item => {
            switch (typeof item) {
                case "string": {
                    const str = item;
                    if (is(str)) {
                        if (!this.Display) {
                            this.Display = {};
                        }
                        if (!this.Display.Images) {
                            this.Display.Images = [];
                        }
                        this.Display.Images.push(str);
                    }
                    else if (is(str)) {
                        if (!this.Display) {
                            this.Display = {};
                        }
                        if (this.Display.Icon) {
                            throw badJsonError(this.constructor, str, "Row already has an icon!");
                        }
                        this.Display.Icon = str;
                    }
                    else if (!this.Result || this.Result?.length === 0) {
                        this.Result = str;
                    }
                    else if (!this.Summary || this.Summary?.length === 0) {
                        this.Summary = str;
                    }
                    else {
                        throw badJsonError(this.constructor, str, "Unable to infer string assignment");
                    }
                    break;
                }
                case "object": {
                    if (this.Floor === null && this.Ceiling === null) {
                        break;
                    }
                    _.forEach(item, (value, key) => {
                        switch (key) {
                            case "Part of speech": {
                                if (!this.Content) {
                                    this.Content = new OracleContent({});
                                }
                                this.Content["Part of speech"] = value;
                                break;
                            }
                            case "Subtable": {
                                if (Array.isArray(value) && Array.isArray(value[0])) {
                                    this.Subtable = value.map(rowData => new Row(this.$id + " / Subtable", rowData));
                                }
                                else if (Array.isArray(value) && typeof value[0] === "object") {
                                    this.Subtable = value.map(rowData => new Row(this.$id + " / Subtable", rowData));
                                }
                                else {
                                    throw badJsonError(this.constructor, value, "expected IOracleTableRow[]");
                                }
                                break;
                            }
                            case "Oracle rolls": {
                                if (!is(value)) {
                                    throw badJsonError(this.constructor, value, "expected OracleTableId[]");
                                }
                                this["Oracle rolls"] = value;
                                break;
                            }
                            case "Multiple rolls": {
                                this["Multiple rolls"] = new MultipleRolls(value);
                                break;
                            }
                            case "Game objects": {
                                if (!this["Game objects"]) {
                                    this["Game objects"] = [];
                                }
                                const gameObjData = value;
                                gameObjData.forEach(item => this["Game objects"]?.push(new GameObject(item)));
                                break;
                            }
                            case "Suggestions": {
                                let newSuggestions;
                                if (Array.isArray(value)) {
                                    const suggestData = _.cloneDeep(value);
                                    const suggestItems = suggestData.map(item => new Suggestions(item));
                                    newSuggestions = suggestItems.reduce((a, b) => _.merge(a, b));
                                }
                                else {
                                    newSuggestions = new Suggestions(value);
                                }
                                if (!this.Suggestions) {
                                    this.Suggestions = newSuggestions;
                                }
                                else {
                                    this.Suggestions = _.merge({ ...this.Suggestions }, { ...newSuggestions });
                                }
                                break;
                            }
                            case "Result": {
                                if (typeof value !== "string") {
                                    throw badJsonError(this.constructor, value, "expected result string");
                                }
                                if (!this.Result || this.Result.length === 0) {
                                    this.Result = value;
                                }
                                break;
                            }
                            case "Summary": {
                                if (typeof value !== "string") {
                                    throw badJsonError(this.constructor, value, "expected summary string");
                                }
                                if (!this.Summary || this.Summary.length === 0) {
                                    this.Summary = value;
                                }
                                break;
                            }
                            case "Attributes": {
                                this.Attributes = new AttributeSetter(value);
                                break;
                            }
                            case "Roll template": {
                                this["Roll template"] = item["Roll template"];
                                break;
                            }
                            default:
                                break;
                        }
                    });
                    break;
                }
                default:
                    throw badJsonError(this.constructor, item, "Unable to infer key for object");
            }
        });
        if (!this.Result || this.Result.length === 0) {
            throw badJsonError(this.constructor, this, "Row doesn't have a result string");
        }
    }
    validateRollTemplate() {
        if (this["Roll template"]) {
            return validateRollTemplate(this, this["Roll template"]);
        }
        else {
            return true;
        }
        ;
    }
}
//# sourceMappingURL=Row.js.map