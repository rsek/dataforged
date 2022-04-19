"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
const index_js_1 = require("../index.js");
const badJsonError_js_1 = require("../../utils/logging/badJsonError.js");
const validateRollTemplate_js_1 = require("../../utils/validation/validateRollTemplate.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Class representing a single row of an oracle table.
 * @internal
 */
class Row {
    /**
     * Creates an instance of Row.
     */
    constructor(parentId, json) {
        let rowData = lodash_es_1.default.clone(json);
        if (Array.isArray(rowData) && rowData.some(item => Array.isArray(item))) {
            rowData = rowData.flat(2);
        }
        this.Floor = Array.isArray(rowData) ? rowData[0] : rowData.Floor;
        this.Ceiling = Array.isArray(rowData) ? rowData[1] : rowData.Ceiling;
        if ((typeof this.Floor) !== (typeof this.Ceiling)) {
            throw (0, badJsonError_js_1.badJsonError)(this.constructor, rowData, "Floor and Ceiling must have the same type (either number or null)");
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
        const rowContents = Array.isArray(rowData) ? rowData.slice(2) : [lodash_es_1.default.omit(rowData, ["Floor", "Ceiling"])];
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
                            throw (0, badJsonError_js_1.badJsonError)(this.constructor, str, "Row already has an icon!");
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
                        throw (0, badJsonError_js_1.badJsonError)(this.constructor, str, "Unable to infer string assignment");
                    }
                    break;
                }
                case "object": {
                    if (this.Floor === null && this.Ceiling === null) {
                        // null rows only exist to provide display text, so they only get strings assigned to them;
                        break;
                    }
                    lodash_es_1.default.forEach(item, (value, key) => {
                        switch (key) {
                            case "Part of speech": {
                                if (!this.Content) {
                                    this.Content = new index_js_1.OracleContent({});
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
                                    throw (0, badJsonError_js_1.badJsonError)(this.constructor, value, "expected IOracleTableRow[]");
                                }
                                break;
                            }
                            case "Oracle rolls": {
                                // if (!is<OracleTableId[]>(value)) {
                                //   throw badJsonError(this.constructor, value, "expected OracleTableId[]");
                                // }
                                if (!Array.isArray(value)) {
                                    throw (0, badJsonError_js_1.badJsonError)(this.constructor, value, "expected OracleTableId[]");
                                }
                                this["Oracle rolls"] = value;
                                break;
                            }
                            case "Multiple rolls": {
                                this["Multiple rolls"] = new index_js_1.MultipleRolls(value);
                                break;
                            }
                            case "Game objects": {
                                if (!this["Game objects"]) {
                                    this["Game objects"] = [];
                                }
                                const gameObjData = value;
                                gameObjData.forEach(item => { var _a; return (_a = this["Game objects"]) === null || _a === void 0 ? void 0 : _a.push(new index_js_1.GameObject(item)); });
                                break;
                            }
                            case "Suggestions": {
                                // console.log("row has suggestions:", JSON.stringify(rowContents));
                                let newSuggestions;
                                if (Array.isArray(value)) {
                                    // console.log("Received a suggestion array, merging...", value);
                                    const suggestData = lodash_es_1.default.cloneDeep(value);
                                    const suggestItems = suggestData.map(item => new index_js_1.Suggestions(item));
                                    newSuggestions = suggestItems.reduce((a, b) => lodash_es_1.default.merge(a, b));
                                    // console.log("merged multiple suggestions", newSuggestions);
                                }
                                else {
                                    newSuggestions = new index_js_1.Suggestions(value);
                                    // console.log("single suggestion", newSuggestions);
                                }
                                if (!this.Suggestions) {
                                    this.Suggestions = newSuggestions;
                                }
                                else {
                                    this.Suggestions = lodash_es_1.default.merge(Object.assign({}, this.Suggestions), Object.assign({}, newSuggestions));
                                }
                                // console.log("final suggestions object", this.Suggestions);
                                break;
                            }
                            case "Result": {
                                if (typeof value !== "string") {
                                    throw (0, badJsonError_js_1.badJsonError)(this.constructor, value, "expected result string");
                                }
                                if (!this.Result || this.Result.length === 0) {
                                    this.Result = value;
                                }
                                break;
                            }
                            case "Summary": {
                                if (typeof value !== "string") {
                                    throw (0, badJsonError_js_1.badJsonError)(this.constructor, value, "expected summary string");
                                }
                                if (!this.Summary || this.Summary.length === 0) {
                                    this.Summary = value;
                                }
                                break;
                            }
                            case "Attributes": {
                                this.Attributes = new index_js_1.AttributeSetter(value);
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
                    throw (0, badJsonError_js_1.badJsonError)(this.constructor, item, "Unable to infer key for object");
            }
        });
        if (!this.Result || this.Result.length === 0) {
            throw (0, badJsonError_js_1.badJsonError)(this.constructor, this, "Row doesn't have a result string");
        }
    }
    // this has to happen after derived class inheritance, rather than during the class constructor, so that class inheritance works properly. it gets done when the Oracle class builds the rows.
    // FIXME: alternately, i could write an abstract class or something, oof.
    validateRollTemplate() {
        if (this["Roll template"]) {
            return (0, validateRollTemplate_js_1.validateRollTemplate)(this, this["Roll template"]);
        }
        else {
            return true;
        }
        ;
    }
}
exports.Row = Row;
//# sourceMappingURL=Row.js.map