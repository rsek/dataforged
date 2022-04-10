import { badJsonError } from "../logging/badJsonError.js";
import _ from "lodash-es";
import { TypedRegEx } from "typed-regex";
import { is } from "typescript-is";
// eslint-disable-next-line no-useless-escape
const rollTplPattern = TypedRegEx("\$\{\{(?<id>.*?)\}\}", "g");
/**
 * It validates that the RollTemplate object has the same keys as the parent object, and validates each individual roll template string.
 * @param parent - The parent object that the template is being validated against.
 * @param templateObj - RollTemplate<T>
 * @returns The original object as the validated type.
 */
export function validateRollTemplate(parent, templateObj) {
    // FIXME: smarted subtable template handling.
    _.forEach(templateObj, (rollTplData, key) => {
        if (!parent[key]) {
            // console.info(parent);
            throw badJsonError(validateRollTemplate, templateObj, `RollTemplate key '${key}' doesn't exist on its parent object. This is necessary so that a placeholder string is provided.`);
        }
        if (rollTplData) {
            // console.log("validating template data", rollTplData);
            _.forEach(rollTplData, (v, k) => {
                // console.log("validating string", v);
                validateRollTemplateString(v);
            });
        }
    });
    return templateObj;
}
/**
 * It takes a string and returns true if it's a valid roll template string
 * @param str - The string to validate.
 * @returns A boolean indicating whether the string is valid.
 */
export function validateRollTemplateString(str) {
    if (typeof str !== "string") {
        throw badJsonError(validateRollTemplateString, str, "Expected a string");
    }
    const captures = _.compact(rollTplPattern.captureAll(str).map(capture => capture === null || capture === void 0 ? void 0 : capture.id));
    captures.forEach(capture => {
        if (!is(capture, object => { function _1(object) {
            var _a;
            const typePairs = [["Oracles/Derelicts/Access/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Derelicts/Community/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function _3(object) {
            var _a;
            const typePairs = [["Oracles/Derelicts/Engineering/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Derelicts/Living/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Derelicts/Medical/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Derelicts/Operations/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Derelicts/Production/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Derelicts/Research/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Location_Themes/Chaotic/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Location_Themes/Fortified/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Location_Themes/Haunted/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Location_Themes/Infested/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Location_Themes/Inhabited/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Location_Themes/Mechanical/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Location_Themes/Ruined/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Location_Themes/Sacred/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Desert/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Furnace/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Grave/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Ice/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Jovian/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Jungle/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Ocean/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Rocky/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Shattered/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Tainted/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/Vital/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Vaults/Interior/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Vaults/Sanctum/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Character Creation/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Characters/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Core/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Creatures/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Factions/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Misc/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Moves/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Space/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Starships/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Derelicts/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Location Themes/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Planets/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
            var _a;
            const typePairs = [["Oracles/Vaults/", "string"], ["", undefined]];
            let position = 0;
            for (const [index, typePair] of typePairs.entries()) {
                const [currentText, currentType] = typePair;
                const [nextText, nextType] = (_a = typePairs[index + 1]) !== null && _a !== void 0 ? _a : [undefined, undefined];
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
        } function su__1__2__3__4__5__6__7__8__9__10__11__12__13__14__15__16__17__18__19__20__21__22__23__24__25__26__27__28__29__30__31__32__33__34__35__36__37__38__39__40__41__42_eu(object) { var conditions = [_1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42]; for (const condition of conditions) {
            var error = condition(object);
            if (!error)
                return null;
        } return {}; } return su__1__2__3__4__5__6__7__8__9__10__11__12__13__14__15__16__17__18__19__20__21__22__23__24__25__26__27__28__29__30__31__32__33__34__35__36__37__38__39__40__41__42_eu(object); })) {
            throw badJsonError(validateRollTemplateString, capture, "Doesn't appear to be a valid OracleTableId");
        }
    });
    return str;
}
//# sourceMappingURL=validateRollTemplate.js.map