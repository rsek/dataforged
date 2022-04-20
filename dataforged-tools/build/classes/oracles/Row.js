import { AttributeSetter, GameObject, MultipleRolls, OracleContent, Suggestions } from "../index.js";
import { badJsonError } from "../../utils/logging/badJsonError.js";
import { validateRollTemplate } from "../../utils/validation/validateRollTemplate.js";
import _ from "lodash-es";
/**
 * Class representing a single row of an oracle table.
 * @internal
 */
export class Row {
    /**
     * Creates an instance of Row.
     */
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.$id = `${parentId}/${rangeString}`;
        }
        const rowContents = Array.isArray(rowData) ? rowData.slice(2) : [_.omit(rowData, ["Floor", "Ceiling"])];
        rowContents.forEach(item => {
            var _a, _b;
            switch (typeof item) {
                case "string": {
                    const str = item;
                    if (str.match(/http.*\.webp/)) {
                        if (!this.Display) {
                            this.Display = {};
                        }
                        if (!this.Display.Images) {
                            this.Display.Images = [];
                        }
                        this.Display.Images.push(str);
                    }
                    else if (str.match(/http.*\.png/)) {
                        if (!this.Display) {
                            this.Display = {};
                        }
                        if (this.Display.Icon) {
                            throw badJsonError(this.constructor, str, "Row already has an icon!");
                        }
                        this.Display.Icon = str;
                    }
                    else if (!this.Result || ((_a = this.Result) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                        this.Result = str;
                    }
                    else if (!this.Summary || ((_b = this.Summary) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                        this.Summary = str;
                    }
                    else {
                        throw badJsonError(this.constructor, str, "Unable to infer string assignment");
                    }
                    break;
                }
                case "object": {
                    if (this.Floor === null && this.Ceiling === null) {
                        // null rows only exist to provide display text, so they only get strings assigned to them;
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
                                    this.Subtable = value.map(rowData => new Row(this.$id + "/Subtable", rowData));
                                }
                                else if (Array.isArray(value) && typeof value[0] === "object") {
                                    this.Subtable = value.map(rowData => new Row(this.$id + "/Subtable", rowData));
                                }
                                else {
                                    throw badJsonError(this.constructor, value, "expected IOracleTableRow[]");
                                }
                                break;
                            }
                            case "Oracle rolls": {
                                // if (!is<OracleTableId[]>(value)) {
                                //   throw badJsonError(this.constructor, value, "expected OracleTableId[]");
                                // }
                                if (!Array.isArray(value)) {
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
                                gameObjData.forEach(item => { var _a; return (_a = this["Game objects"]) === null || _a === void 0 ? void 0 : _a.push(new GameObject(item)); });
                                break;
                            }
                            case "Suggestions": {
                                // console.log("row has suggestions:", JSON.stringify(rowContents));
                                let newSuggestions;
                                if (Array.isArray(value)) {
                                    // console.log("Received a suggestion array, merging...", value);
                                    const suggestData = _.cloneDeep(value);
                                    const suggestItems = suggestData.map(item => new Suggestions(item));
                                    newSuggestions = suggestItems.reduce((a, b) => _.merge(a, b));
                                    // console.log("merged multiple suggestions", newSuggestions);
                                }
                                else {
                                    newSuggestions = new Suggestions(value);
                                    // console.log("single suggestion", newSuggestions);
                                }
                                if (!this.Suggestions) {
                                    this.Suggestions = newSuggestions;
                                }
                                else {
                                    this.Suggestions = _.merge(Object.assign({}, this.Suggestions), Object.assign({}, newSuggestions));
                                }
                                // console.log("final suggestions object", this.Suggestions);
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
    // this has to happen after derived class inheritance, rather than during the class constructor, so that class inheritance works properly. it gets done when the Oracle class builds the rows.
    // FIXME: alternately, i could write an abstract class or something, oof.
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