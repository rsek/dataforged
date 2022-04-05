import pkg from "fs-extra";
const { copySync } = pkg;

/**
 * Copy all files from the srcRoot to the outRoot
 * @param {string} srcRoot - The path to the source directory where the images are located.
 * @param {string} outRoot - The directory where the images will be copied to.
 */
export default function cloneImages(srcRoot: string, outRoot: string): void {
  console.info(`[buildImages] Copying files from ${srcRoot} to ${outRoot}...`);
  copySync(srcRoot, outRoot, { recursive: true });
}
