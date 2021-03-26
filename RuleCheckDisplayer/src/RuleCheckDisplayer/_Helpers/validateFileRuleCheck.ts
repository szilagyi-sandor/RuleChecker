import { RuleCheckObject } from "../../../../RuleCheckCreator/_Interfaces/RuleCheckObject";
import { FileRuleCheck } from "../../../../RuleCheckCreator/_Interfaces/FileRuleCheck";

export const validateFileRuleCheck = (
  itemRuleCheck: RuleCheckObject
): FileRuleCheck | undefined => {
  const keys = Object.keys(itemRuleCheck);

  const extraKeys = keys.filter(
    (key) =>
      key !== "consoleLogCount" &&
      key !== "todoCount" &&
      key !== "checkedVersion"
  );

  if (extraKeys.length > 0) {
    return undefined;
  }

  const { consoleLogCount, checkedVersion, todoCount } = itemRuleCheck;

  if (typeof consoleLogCount !== "number") {
    return undefined;
  }

  if (typeof todoCount !== "number") {
    return undefined;
  }

  if (
    !(
      typeof checkedVersion === "undefined" ||
      typeof checkedVersion === "string"
    )
  ) {
    return undefined;
  }

  return {
    consoleLogCount,
    todoCount,
    checkedVersion,
  };
};
