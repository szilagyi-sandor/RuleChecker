import { PropsWithChildren } from "react";
import { FileDisplayerProps } from "../FileDisplayer/interfaces";

export interface FolderDisplayerProps
  extends PropsWithChildren<FileDisplayerProps> {
  opened: boolean;
  onToggle: () => void;
}
