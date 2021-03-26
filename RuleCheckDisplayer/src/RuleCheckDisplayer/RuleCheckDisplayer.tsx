import React, { useEffect, useRef, useState } from "react";

import "./RuleCheckDisplayer.scss";

// Interfaces coming from different project
import { RuleCheckResponse } from "../../../RuleCheckCreator/_Interfaces/RuleCheckResponse";

import { RuleCheckDisplayerProps } from "./interfaces";
import RuleCheckItemDisplayer from "./Parts/RuleCheckItemDisplayer/RuleCheckItemDisplayer";
import { getRuleCheckData } from "./_Helpers/getRuleCheckData";
import DefaultFolderDisplayer from "./Parts/FolderDisplayer/FolderDisplayer";
import DefaultFileDisplayer from "./Parts/FileDisplayer/FileDisplayer";

export default function RuleCheckDisplayer({
  ruleCheckUrlBase,
  FolderDisplayer,
  FileDisplayer,
}: RuleCheckDisplayerProps) {
  const ruleCheckUrl = `${
    ruleCheckUrlBase ? `${ruleCheckUrlBase}/` : ``
  }ruleCheck.json`;
  const _FolderDisplayer = FolderDisplayer
    ? FolderDisplayer
    : DefaultFolderDisplayer;
  const _FileDisplayer = FileDisplayer ? FileDisplayer : DefaultFileDisplayer;

  const abortControllerRef = useRef(new AbortController());
  const [
    ruleCheckResponse,
    setRuleCheckResponse,
  ] = useState<RuleCheckResponse>();
  const [closedItems, setClosedItems] = useState<string[]>([]);

  // Getting the ruleCheck.json from file.
  useEffect(() => {
    const abortController = abortControllerRef.current;
    getRuleCheckData(ruleCheckUrl, setRuleCheckResponse, abortController);

    return () => {
      abortController.abort();
    };
  }, [ruleCheckUrl]);

  return (
    <div className="ruleCheckDisplayer">
      {ruleCheckResponse ? (
        Object.keys(ruleCheckResponse.ruleCheckObj).length > 0 ? (
          <RuleCheckItemDisplayer
            FileDisplayer={_FileDisplayer}
            FolderDisplayer={_FolderDisplayer}
            parentKeys={[]}
            ruleCheckObj={ruleCheckResponse.ruleCheckObj}
            closedItems={closedItems}
            setClosedItems={setClosedItems}
            folderData={ruleCheckResponse.folderData}
          />
        ) : (
          <p>ruleCheck.json is empty or invalid.</p>
        )
      ) : (
        <p>Getting ruleCheck.json...</p>
      )}
    </div>
  );
}
