import { PathLike } from 'fs';
import _ from 'lodash';
import t from 'ts-runtime/lib';
import buildDataforged from "./functions/buildDataforged";
import writeJson from './functions/io/writeJSON';

const pathOut: PathLike = "./";
// const legacyPathOut: PathLike = "./legacy/"

let data = buildDataforged();

_.forEach(data, (value, key) => {
  writeJson(pathOut.toString() + `${key}.json` as PathLike, value)
});