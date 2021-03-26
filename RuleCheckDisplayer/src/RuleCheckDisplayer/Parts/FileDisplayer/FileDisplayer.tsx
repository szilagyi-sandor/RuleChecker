import React from "react";

import FileIcon from "../FileIcon/FileIcon";

import "./FileDisplayer.scss";

import { FileDisplayerProps } from "./interfaces";
import CheckResult from "../CheckResult/CheckResult";

export default function FileDisplayer({
  keys,
  name,
  consoleLogCount,
  todoCount,
  checkedVersion,
  last,
}: FileDisplayerProps) {
  const extension = name.split(".").slice(-1)[0];
  const fileCheckType: "success" | "warning" | "error" =
    !todoCount && !consoleLogCount && checkedVersion
      ? "success"
      : !checkedVersion && (todoCount || consoleLogCount)
      ? "error"
      : "warning";

  return (
    <div className={`fileDisplayer${last ? " last" : ""} ${fileCheckType}`}>
      <span>
        <FileIcon className={extension}>.{extension}</FileIcon> {name}{" "}
        <CheckResult type={fileCheckType} text="v:" value={checkedVersion} />{" "}
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
      </span>
    </div>
  );
}
