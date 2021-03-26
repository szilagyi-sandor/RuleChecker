import React, { useEffect, useState } from "react";

// Interfaces coming from different project
import { RuleCheckObject } from "../../../../../RuleCheckCreator/_Interfaces/RuleCheckObject";
import { FileRuleCheck } from "../../../../../RuleCheckCreator/_Interfaces/FileRuleCheck";

import { RuleCheckItemDisplayerProps } from "./interfaces";
import { validateFileRuleCheck } from "../../_Helpers/validateFileRuleCheck";

export default function RuleCheckItemDisplayer(
  props: RuleCheckItemDisplayerProps
) {
  const {
    FileDisplayer,
    FolderDisplayer,
    parentKeys,
    ruleCheckObj,
    closedItems,
    setClosedItems,
    folderData,
  } = props;
  // The JSON is in alphabetical order, but we want to display folders first, then files.
  const [files, setFiles] = useState<Record<string, FileRuleCheck>>({});
  const [folders, setFolders] = useState<RuleCheckObject>({});

  const folderKeys = Object.keys(folders);
  const fileKeys = Object.keys(files);

  // Filling in folders and files.
  useEffect(() => {
    if (ruleCheckObj) {
      const _files: Record<string, FileRuleCheck> = {};
      const _folders: RuleCheckObject = {};

      Object.keys(ruleCheckObj).forEach((key) => {
        const item = ruleCheckObj[key];
        if (item) {
          const fileRuleCheck = validateFileRuleCheck(item);

          if (fileRuleCheck) {
            // Adding item into items.
            _files[key] = fileRuleCheck;
          } else {
            // Adding item into folders.
            _folders[key] = item;
          }
        }
      });

      setFolders(_folders);
      setFiles(_files);
    }
  }, [ruleCheckObj]);

  if (!ruleCheckObj) {
    return null;
  }

  return (
    <div className="ruleCheckItemDisplayer">
      {/* Folders. */}
      {folderKeys.map((key, index) => {
        const componentKeys = [...parentKeys, key];
        const id = componentKeys.join("/");
        const opened = !closedItems.includes(id);
        const folderInfo = folderData[id];

        return (
          <FolderDisplayer
            key={id}
            {...{
              keys: componentKeys,
              name: key,
              onToggle: () => {
                let newItems: string[] = [];
                if (opened) {
                  newItems = [...closedItems, id];
                } else {
                  newItems = closedItems.filter((item) => item !== id);
                }

                setClosedItems(newItems);
              },
              opened,
              checkedVersion: folderInfo.checkedVersion,
              consoleLogCount: folderInfo.consoleLogCount,
              todoCount: folderInfo.todoCount,
              last: folderKeys.length - 1 === index && fileKeys.length === 0,
            }}
          >
            <RuleCheckItemDisplayer
              {...{
                ...props,
                ruleCheckObj: ruleCheckObj[key],
                parentKeys: componentKeys,
              }}
            />
          </FolderDisplayer>
        );
      })}

      {/* Files. */}
      {fileKeys.map((key, index) => {
        const componentKeys = [...parentKeys, key];
        const id = componentKeys.join("/");
        const opened = !closedItems.includes(id);
        const fileItem = files[key];

        return (
          <FileDisplayer
            key={id}
            {...{
              keys: componentKeys,
              name: key,
              onToggle: () => {
                let newItems: string[] = [];
                if (opened) {
                  newItems = [...closedItems, id];
                } else {
                  newItems = closedItems.filter((item) => item !== id);
                }

                setClosedItems(newItems);
              },
              opened,
              checkedVersion: fileItem.checkedVersion,
              consoleLogCount: fileItem.consoleLogCount,
              todoCount: fileItem.todoCount,
              last: fileKeys.length - 1 === index,
            }}
          />
        );
      })}
    </div>
  );
}
