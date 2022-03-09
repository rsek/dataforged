import { copySync } from "fs-extra";


export default function cloneImages(srcRoot: string, outRoot: string): void {
  console.info(`[buildImages] Copying files from ${srcRoot} to ${outRoot}...`);
  copySync(srcRoot, outRoot, { "recursive": true });
}
