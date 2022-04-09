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
                    if (is(str, object => { function _1(object) {
                        const typePairs = [["http://", "string"], [".webp", undefined]];
                        let position = 0;
                        for (const [index, typePair] of typePairs.entries()) {
                            const [currentText, currentType] = typePair;
                            const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                            if (object.substr(position, currentText.length) !== currentText)
                                return {};
                            position += currentText.length;
                            if (nextText === "" && nextType !== undefined) {
                                const char = object.charAt(position);
                                if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                    return {};
                            }
                            const nextTextOrType = nextText === "" ? nextType : nextText;
                            const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                            if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                return {};
                            position += resolvedPlaceholder.length;
                        }
                        return null;
                    } function _2(object) {
                        const typePairs = [["https://", "string"], [".webp", undefined]];
                        let position = 0;
                        for (const [index, typePair] of typePairs.entries()) {
                            const [currentText, currentType] = typePair;
                            const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                            if (object.substr(position, currentText.length) !== currentText)
                                return {};
                            position += currentText.length;
                            if (nextText === "" && nextType !== undefined) {
                                const char = object.charAt(position);
                                if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                    return {};
                            }
                            const nextTextOrType = nextText === "" ? nextType : nextText;
                            const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                            if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                return {};
                            position += resolvedPlaceholder.length;
                        }
                        return null;
                    } function _null(object) { ; if (object !== null)
                        return {};
                    else
                        return null; } function su__1__2_eu(object) { var conditions = [_1, _2]; for (const condition of conditions) {
                        var error = condition(object);
                        if (!error)
                            return null;
                    } return {}; } return su__1__2_eu(object); })) {
                        if (!this.Display) {
                            this.Display = {};
                        }
                        if (!this.Display.Images) {
                            this.Display.Images = [];
                        }
                        this.Display.Images.push(str);
                    }
                    else if (is(str, object => { function _1(object) {
                        const typePairs = [["http://", "string"], [".svg", undefined]];
                        let position = 0;
                        for (const [index, typePair] of typePairs.entries()) {
                            const [currentText, currentType] = typePair;
                            const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                            if (object.substr(position, currentText.length) !== currentText)
                                return {};
                            position += currentText.length;
                            if (nextText === "" && nextType !== undefined) {
                                const char = object.charAt(position);
                                if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                    return {};
                            }
                            const nextTextOrType = nextText === "" ? nextType : nextText;
                            const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                            if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                return {};
                            position += resolvedPlaceholder.length;
                        }
                        return null;
                    } function _2(object) {
                        const typePairs = [["https://", "string"], [".svg", undefined]];
                        let position = 0;
                        for (const [index, typePair] of typePairs.entries()) {
                            const [currentText, currentType] = typePair;
                            const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                            if (object.substr(position, currentText.length) !== currentText)
                                return {};
                            position += currentText.length;
                            if (nextText === "" && nextType !== undefined) {
                                const char = object.charAt(position);
                                if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                    return {};
                            }
                            const nextTextOrType = nextText === "" ? nextType : nextText;
                            const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                            if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                return {};
                            position += resolvedPlaceholder.length;
                        }
                        return null;
                    } function _null(object) { ; if (object !== null)
                        return {};
                    else
                        return null; } function su__1__2_eu(object) { var conditions = [_1, _2]; for (const condition of conditions) {
                        var error = condition(object);
                        if (!error)
                            return null;
                    } return {}; } return su__1__2_eu(object); })) {
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
                                if (!is(value, object => { function _3(object) {
                                    const typePairs = [["Oracles / Derelicts / Access / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _4(object) {
                                    const typePairs = [["Oracles / Derelicts / Community / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _5(object) {
                                    const typePairs = [["Oracles / Derelicts / Engineering / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _6(object) {
                                    const typePairs = [["Oracles / Derelicts / Living / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _7(object) {
                                    const typePairs = [["Oracles / Derelicts / Medical / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _8(object) {
                                    const typePairs = [["Oracles / Derelicts / Operations / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _9(object) {
                                    const typePairs = [["Oracles / Derelicts / Production / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _10(object) {
                                    const typePairs = [["Oracles / Derelicts / Research / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _11(object) {
                                    const typePairs = [["Oracles / Location Themes / Chaotic / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _12(object) {
                                    const typePairs = [["Oracles / Location Themes / Fortified / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _13(object) {
                                    const typePairs = [["Oracles / Location Themes / Haunted / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _14(object) {
                                    const typePairs = [["Oracles / Location Themes / Infested / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _15(object) {
                                    const typePairs = [["Oracles / Location Themes / Inhabited / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _16(object) {
                                    const typePairs = [["Oracles / Location Themes / Mechanical / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _17(object) {
                                    const typePairs = [["Oracles / Location Themes / Ruined / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _18(object) {
                                    const typePairs = [["Oracles / Location Themes / Sacred / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _19(object) {
                                    const typePairs = [["Oracles / Planets / Desert / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _20(object) {
                                    const typePairs = [["Oracles / Planets / Furnace / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _21(object) {
                                    const typePairs = [["Oracles / Planets / Grave / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _22(object) {
                                    const typePairs = [["Oracles / Planets / Ice / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _23(object) {
                                    const typePairs = [["Oracles / Planets / Jovian / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _24(object) {
                                    const typePairs = [["Oracles / Planets / Jungle / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _25(object) {
                                    const typePairs = [["Oracles / Planets / Ocean / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _26(object) {
                                    const typePairs = [["Oracles / Planets / Rocky / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _27(object) {
                                    const typePairs = [["Oracles / Planets / Shattered / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _28(object) {
                                    const typePairs = [["Oracles / Planets / Tainted / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _29(object) {
                                    const typePairs = [["Oracles / Planets / Vital / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _30(object) {
                                    const typePairs = [["Oracles / Vaults / Interior / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _31(object) {
                                    const typePairs = [["Oracles / Vaults / Sanctum / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _32(object) {
                                    const typePairs = [["Oracles / Character Creation / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _33(object) {
                                    const typePairs = [["Oracles / Characters / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _34(object) {
                                    const typePairs = [["Oracles / Core / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _35(object) {
                                    const typePairs = [["Oracles / Creatures / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _36(object) {
                                    const typePairs = [["Oracles / Factions / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _37(object) {
                                    const typePairs = [["Oracles / Misc / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _38(object) {
                                    const typePairs = [["Oracles / Moves / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _39(object) {
                                    const typePairs = [["Oracles / Space / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _40(object) {
                                    const typePairs = [["Oracles / Starships / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _41(object) {
                                    const typePairs = [["Oracles / Derelicts / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _42(object) {
                                    const typePairs = [["Oracles / Location Themes / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _43(object) {
                                    const typePairs = [["Oracles / Planets / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function _44(object) {
                                    const typePairs = [["Oracles / Vaults / ", "string"], ["", undefined]];
                                    let position = 0;
                                    for (const [index, typePair] of typePairs.entries()) {
                                        const [currentText, currentType] = typePair;
                                        const [nextText, nextType] = typePairs[index + 1] ?? [undefined, undefined];
                                        if (object.substr(position, currentText.length) !== currentText)
                                            return {};
                                        position += currentText.length;
                                        if (nextText === "" && nextType !== undefined) {
                                            const char = object.charAt(position);
                                            if (((currentType === "number" || currentType === "bigint") && isNaN(Number(char))) || ((currentType === "string" || currentType === "any") && char === ""))
                                                return {};
                                        }
                                        const nextTextOrType = nextText === "" ? nextType : nextText;
                                        const resolvedPlaceholder = object.substring(position, typeof nextTextOrType === "undefined" ? object.length - 1 : object.indexOf(nextTextOrType, position));
                                        if ((currentType === "number" && isNaN(Number(resolvedPlaceholder))) || (currentType === "bigint" && (resolvedPlaceholder.includes(".") || isNaN(Number(resolvedPlaceholder)))) || (currentType === "undefined" && resolvedPlaceholder !== "undefined") || (currentType === "null" && resolvedPlaceholder !== "null"))
                                            return {};
                                        position += resolvedPlaceholder.length;
                                    }
                                    return null;
                                } function su__3__4__5__6__7__8__9__10__11__12__13__14__15__16__17__18__19__20__21__22__23__24__25__26__27__28__29__30__31__32__33__34__35__36__37__38__39__40__41__42__43__44_eu(object) { var conditions = [_3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44]; for (const condition of conditions) {
                                    var error = condition(object);
                                    if (!error)
                                        return null;
                                } return {}; } function sa_su__3__4__5__6__7__8__9__10__11__12__13__14__15__16__17__18__19__20__21__22__23__24__25__26__27__28__29__30__31__32__33__34__35__36__37__38__39__40__41__42__43__44_eu_ea_2(object) { ; if (!Array.isArray(object))
                                    return {}; for (let i = 0; i < object.length; i++) {
                                    var error = su__3__4__5__6__7__8__9__10__11__12__13__14__15__16__17__18__19__20__21__22__23__24__25__26__27__28__29__30__31__32__33__34__35__36__37__38__39__40__41__42__43__44_eu(object[i]);
                                    if (error)
                                        return error;
                                } return null; } return sa_su__3__4__5__6__7__8__9__10__11__12__13__14__15__16__17__18__19__20__21__22__23__24__25__26__27__28__29__30__31__32__33__34__35__36__37__38__39__40__41__42__43__44_eu_ea_2(object); })) {
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