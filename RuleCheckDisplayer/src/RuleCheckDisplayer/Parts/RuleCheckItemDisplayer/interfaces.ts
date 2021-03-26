// Interfaces coming from different project
import { RuleCheckObject } from "../../../../../RuleCheckCreator/_Interfaces/RuleCheckObject";
import { FileRuleCheck } from "../../../../../RuleCheckCreator/_Interfaces/FileRuleCheck";

import { FileDisplayer, FolderDisplayer } from "../../interfaces";

export interface RuleCheckItemDisplayerProps {
  FolderDisplayer: FolderDisplayer;
  FileDisplayer: FileDisplayer;
  ruleCheckObj?: RuleCheckObject;
  parentKeys: string[];
  closedItems: string[];
  setClosedItems: (param: string[]) => void;
  folderData: Record<string, FileRuleCheck>;
}
