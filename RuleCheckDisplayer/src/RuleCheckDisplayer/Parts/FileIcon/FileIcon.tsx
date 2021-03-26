import React, { PropsWithChildren } from "react";

import "./FileIcon.scss";

import { FileIconPops } from "./interfaces";

export default function FileIcon({
  children,
  className,
}: PropsWithChildren<FileIconPops>) {
  return (
    <span className={`fileIcon${className ? ` ${className}` : ``}`}>
      {children}
    </span>
  );
}
