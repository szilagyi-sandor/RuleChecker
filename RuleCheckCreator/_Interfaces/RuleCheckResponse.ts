import { FileRuleCheck } from "./FileRuleCheck";
import { RuleCheckObject } from "./RuleCheckObject";

export interface RuleCheckResponse {
  ruleCheckObj: RuleCheckObject;
  folderData: { [key: string]: FileRuleCheck };
}
