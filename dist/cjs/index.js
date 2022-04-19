"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
/* eslint-disable no-restricted-imports */
__exportStar(require("./json_out/index.js"), exports);
const starforged_assets_json_1 = __importDefault(require("./starforged-assets.json"));
const starforged_encounters_json_1 = __importDefault(require("./starforged-encounters.json"));
const starforged_moves_json_1 = __importDefault(require("./starforged-moves.json"));
const starforged_oracles_json_1 = __importDefault(require("./starforged-oracles.json"));
const starforged_setting_truths_json_1 = __importDefault(require("./starforged-setting_truths.json"));
;
/**
 * @public
 */
const data = {
    assets: starforged_assets_json_1.default,
    encounters: starforged_encounters_json_1.default,
    moves: starforged_moves_json_1.default,
    oracles: starforged_oracles_json_1.default,
    truths: starforged_setting_truths_json_1.default,
};
exports.data = data;
//# sourceMappingURL=index.js.map