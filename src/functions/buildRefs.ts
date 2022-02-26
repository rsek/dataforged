import fs from "fs";
import { refsPath } from './buildWithRefs';


export default function buildRefs(path: fs.PathLike = refsPath) {
  const files: fs.PathLike[] = fs.readdirSync(path).filter(item => item.match(".yaml")).map(item => path + item);
  // console.log(refFiles);
  let refString: string = files.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
  refString = refString.replaceAll(/^/gim, "  ");
  refString = "_refs:\n" + refString;
  return refString;
}
