//License: MIT
export type KeysWithValuesOfType<T, V> = keyof {
  [P in keyof Required<T> as Required<T>[P] extends V ? P : never]: P;
};
