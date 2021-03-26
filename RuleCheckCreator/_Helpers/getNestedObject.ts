import { NestedObject } from "../_Interfaces/NestedObject";

export const getNestedObject = <T>(
  obj: NestedObject<T>,
  keys: string[]
): NestedObject<T> => {
  if (keys.length === 0) {
    return obj;
  }

  let output = obj[keys[0]];
  for (let i = 1; i < keys.length; i++) {
    const key = keys[i];

    if (output) {
      output = output[key];
    } else {
      return undefined;
    }
  }

  return output;
};
