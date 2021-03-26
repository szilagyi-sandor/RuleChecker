import { FileDisplayerProps } from "./Parts/FileDisplayer/interfaces";
import { FolderDisplayerProps } from "./Parts/FolderDisplayer/interfaces";

export interface RuleCheckDisplayerProps {
  FolderDisplayer?: FolderDisplayer;
  FileDisplayer?: FileDisplayer;
  ruleCheckUrlBase?: string;
}

export interface FileDisplayer {
  (props: FileDisplayerProps): JSX.Element;
}

export interface FolderDisplayer {
  (props: FolderDisplayerProps): JSX.Element;
}
