// Interfaces coming from different project
import { RuleCheckResponse } from "../../../../RuleCheckCreator/_Interfaces/RuleCheckResponse";

export const getRuleCheckData = async (
  ruleCheckUrlBase: string,
  setRuleCheckObj: (param: RuleCheckResponse) => void,
  abortController: AbortController
) => {
  try {
    const response = await fetch(ruleCheckUrlBase, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: abortController.signal,
    });

    if (!response.ok) {
      throw Error(`${response.status} fetch failed`);
    }
    const data: RuleCheckResponse = await response.json();
    setRuleCheckObj(data);
  } catch (error) {
    if (error.name === "SyntaxError") {
      console.log("Invalid syntax in ruleCheck.json.");
    }

    if (error.name === "AbortError") {
      console.log("Request to get ruleCheck.json was cancelled.");
    }

    console.error(error);

    setRuleCheckObj({
      folderData: {},
      ruleCheckObj: {},
    });
  }
};
