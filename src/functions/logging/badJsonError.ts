/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function badJsonError(source: any, obj?: unknown, message: string = "JSON does not conform to interface"): Error {
  let srcId: string;
  if (source.name) {
    srcId = source.name;
  } else {
    srcId = source.toString();
  }
  let msg = `[${srcId}] ${message}`;
  if (obj) {
    msg += `: ${JSON.stringify(obj)}`
  }
  return new Error(msg);
}