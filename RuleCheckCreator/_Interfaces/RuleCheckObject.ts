import { NestedObject } from "./NestedObject";

export type RuleCheckObject = {
  consoleLogCount?: number | RuleCheckObject;
  todoCount?: number | RuleCheckObject;
  checkedVersion?: string | RuleCheckObject;
} & { [key: string]: RuleCheckObject | undefined };
