import React from "react";

import "./FolderDisplayer.scss";

import { ReactComponent as FolderLogo } from "../../_Assets/Images/Folder.svg";

import { FolderDisplayerProps } from "./interfaces";
import CheckResult from "../CheckResult/CheckResult";

export default function FolderDisplayer({
  keys,
  name,
  children,
  consoleLogCount,
  todoCount,
  checkedVersion,
  opened,
  onToggle,
  last,
}: FolderDisplayerProps) {
  const fileCheckType: "success" | "warning" | "error" =
    !todoCount && !consoleLogCount && checkedVersion
      ? "success"
      : !checkedVersion && (todoCount || consoleLogCount)
      ? "error"
      : "warning";

  return (
    <div
      className={`folderDisplayer${last ? " last" : ""}${
        opened ? "" : " collapsed"
      } ${fileCheckType}`}
    >
      <span>
        <button onClick={onToggle}>
          <FolderLogo /> {name}{" "}
          <CheckResult type={fileCheckType} text="v:" value={checkedVersion} />{" "}
          <span className="caret" />{" "}
          <CheckResult
            type={!!checkedVersion ? "warning" : "error"}
            text="logs:"
            value={consoleLogCount}
          />{" "}
          <CheckResult
            type={!!checkedVersion ? "warning" : "error"}
            text="todos:"
            value={todoCount}
          />
        </button>
      </span>

      {opened && <div className="inner">{children}</div>}
    </div>
  );
}
