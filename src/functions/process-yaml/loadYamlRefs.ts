import fs from "fs";
import { refsPath } from "./concatWithYamlRefs.js";

export default function loadYamlRefs(path: fs.PathLike = refsPath) {
  const files: fs.PathLike[] = fs.readdirSync(path).filter(item => item.match(".yaml"))
    .map(item => path.toString() + item);
  // console.log(refFiles);
  let refString: string = files.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
  refString = refString.replaceAll(/^/gim, "  ");
  refString = "_refs:\n" + refString;
  return refString;
}
