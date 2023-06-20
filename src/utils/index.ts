type Value<T> = {
  [K in keyof T]: T[K];
}[keyof T];

export const getEntries = <T extends object>(input: T) =>
  Object.entries(input) as Array<[keyof T, Value<T>]>;

export const getKeys = <T extends object>(input: T) =>
  Object.keys(input) as Array<keyof T>;
