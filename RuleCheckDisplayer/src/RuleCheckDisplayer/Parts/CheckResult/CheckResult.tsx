import React from "react";

import "./CheckResult.scss";

import { CheckResultProps } from "./interfaces";

export default function CheckResult({ type, text, value }: CheckResultProps) {
  if (!value) {
    return null;
  }

  return (
    <span className={`checkResult ${type}`}>
      {text} {value}
    </span>
  );
}
