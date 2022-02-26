
export default function badJsonError(source: any, obj?: any, message: string = "JSON does not conform to interface"): Error {
  let msg = `[${source.name}] ${message}`;
  if (obj) {
    msg += `: ${JSON.stringify(obj)}`
  }
  return new Error(msg);
}