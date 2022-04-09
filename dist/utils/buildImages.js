import { cloneImages } from "../../dist/utils/process_img/cloneImages.js";
import { convertRasterImages } from "../../dist/utils/process_img/convertRasterImages.js";
export function buildImages(srcRoot, outPng, srcPng, outWebP) {
    cloneImages(srcRoot, outPng);
    convertRasterImages(srcPng, outWebP);
}
//# sourceMappingURL=buildImages.js.map