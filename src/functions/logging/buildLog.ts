interface IMayHaveId extends Function {
  $id?: string;
}


export default function buildLog(fn: Function, message: string): void {
  let parentIdentifier = fn.name;
  let msg = `[${parentIdentifier}] ${message}`;
  console.info(msg);
}