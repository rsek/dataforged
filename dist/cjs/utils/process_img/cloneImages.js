"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneImages = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const { copySync } = fs_extra_1.default;
/**
 * Copy all files from the srcRoot to the outRoot
 * @param srcRoot - The path to the source directory where the images are located.
 * @param outRoot - The directory where the images will be copied to.
 */
function cloneImages(srcRoot, outRoot) {
    // eslint-disable-next-line no-console
    console.info(`[buildImages] Copying files from ${srcRoot} to ${outRoot}...`);
    copySync(srcRoot, outRoot, { recursive: true });
}
exports.cloneImages = cloneImages;
//# sourceMappingURL=cloneImages.js.map