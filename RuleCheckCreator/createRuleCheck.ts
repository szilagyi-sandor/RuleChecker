import { readdir, stat, readFile, writeFile } from "fs";
import { promisify } from "util";
import { join, extname } from "path";

import { RuleCheckObject } from "./_Interfaces/RuleCheckObject";
import { getNestedObject } from "./_Helpers/getNestedObject";
import { FileRuleCheck } from "./_Interfaces/FileRuleCheck";
import { defaultFolderData } from "./_Constants/defaultFolderData";
import { validateCheckVersion } from "./_Helpers/validateCheckversion";
import { getAllSelectorsFromSelector } from "./_Helpers/getAllSelectorsFromSelector";
import { sortVersions } from "./_Helpers/sortversions";

const params = process.argv;
const inputIndex = params.findIndex((val) => val === "-input");
const outputIndex = params.findIndex((val) => val === "-output");

const fileTypesToCheck = [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"];

// Promisify functions.
const readdirAsync = promisify(readdir);
const statFileAsync = promisify(stat);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const checkFolder = async (
  folder: string,
  parentKeys = ["Root"],
  ruleCheckObj: RuleCheckObject = { Root: {} },
  folderData: { [key: string]: FileRuleCheck } = { Root: defaultFolderData }
) => {
  const files = await readdirAsync(folder);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = join(folder, file);
    const stat = await statFileAsync(filePath);
    const firstParent: RuleCheckObject = getNestedObject(
      ruleCheckObj,
      parentKeys
    );

    if (stat.isFile()) {
      let fileRuleCheck: RuleCheckObject = {};
      fileRuleCheck.consoleLogCount = 0;
      fileRuleCheck.todoCount = 0;
      fileRuleCheck.checkedVersion = undefined;

      if (fileTypesToCheck.includes(extname(filePath))) {
        const fileData = await readFileAsync(filePath, "utf8");

        const consoleLogCount = fileData.split("console.log").length - 1;
        const todoCount = fileData.split("// TODO").length - 1;

        let checkedVersion: string;
        const checkedSplit = fileData.split("// CHECKED");
        if (checkedSplit.length > 1) {
          // The last split will contain the first
          let lastCheckedSplit = checkedSplit[checkedSplit.length - 1];
          // Replaceing tabs, new lines and returns
          lastCheckedSplit = lastCheckedSplit
            .replace(/\t/g, " ")
            .replace(/\n/g, " ")
            .replace(/\r/g, " ");
          const checkedVersionToValidate = lastCheckedSplit.split(" ")[1];
          checkedVersion = validateCheckVersion(checkedVersionToValidate);
        }

        fileRuleCheck.consoleLogCount = consoleLogCount;
        fileRuleCheck.todoCount = todoCount;
        fileRuleCheck.checkedVersion = checkedVersion;

        // Updating all parent folders.
        const allParentSelectors = getAllSelectorsFromSelector(
          parentKeys
        ).map((selector) => selector.join("/"));

        allParentSelectors.forEach((parentKey) => {
          const parent = folderData[parentKey];

          folderData[parentKey] = {
            consoleLogCount: parent.consoleLogCount + consoleLogCount,
            todoCount: parent.todoCount + todoCount,
            checkedVersion:
              !parent.checkedVersion || !checkedVersion
                ? undefined
                : sortVersions([checkedVersion, parent.checkedVersion])[0],
          };
        });
      } else {
        fileRuleCheck.checkedVersion = "Not targeted";
      }

      firstParent[file] = fileRuleCheck;
    } else if (stat.isDirectory()) {
      const currentKeys = [...parentKeys, file];
      firstParent[file] = {};
      folderData[currentKeys.join("/")] = defaultFolderData;
      await checkFolder(filePath, currentKeys, ruleCheckObj, folderData);
    }
  }

  return {
    ruleCheckObj,
    folderData,
  };
};

const createRuleCheck = async () => {
  if (!inputIndex || !params[inputIndex + 1]) {
    console.error("The -input parameter is missing.");
    return;
  }

  if (!outputIndex || !params[outputIndex + 1]) {
    console.error("The -output parameter is missing.");
    return;
  }

  const inputParam = params[inputIndex + 1];
  const outputParam = params[outputIndex + 1];

  const result = await checkFolder(inputParam);

  const jsonData = JSON.stringify(result, null, 2);

  await writeFileAsync(`${outputParam}/ruleCheck.json`, jsonData, "utf8");

  console.log("finished writing");
};

createRuleCheck();
