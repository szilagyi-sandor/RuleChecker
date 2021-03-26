export const validateCheckVersion = (
  checkVersion: string
): string | undefined => {
  const versionNumberStrings = checkVersion.split(".");

  for (let i = 0; i < versionNumberStrings.length; i++) {
    const versionNumberString = versionNumberStrings[i];

    if (Number.isNaN(+versionNumberString)) {
      return undefined;
    }
  }

  return checkVersion;
};
