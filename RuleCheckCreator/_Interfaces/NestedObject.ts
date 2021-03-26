export type NestedObject<T> = T & {
  [key: string]: NestedObject<T> | undefined;
};
