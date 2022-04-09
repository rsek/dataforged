import pkg from "fs-extra";
const { copySync } = pkg;
export function cloneImages(srcRoot, outRoot) {
    console.info(`[buildImages] Copying files from ${srcRoot} to ${outRoot}...`);
    copySync(srcRoot, outRoot, { recursive: true });
}
//# sourceMappingURL=cloneImages.js.map