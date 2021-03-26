// Returns the version strings in ASC order ("Not targeted" value is filtered out).
export const sortVersions = (versions: string[]): string[] => {
  const output = versions.filter((v) => v !== "Not targeted");

  return output.sort((a, b) => {
    const aNumberStrings = a.split(".");
    const bNumberStrings = b.split(".");

    const length =
      aNumberStrings.length > bNumberStrings.length
        ? aNumberStrings.length
        : bNumberStrings.length;

    for (let i = 0; i < length; i++) {
      const aNumber = aNumberStrings[i] ? +aNumberStrings[i] : 0;
      const bNumber = bNumberStrings[i] ? +bNumberStrings[i] : 0;

      if (aNumber !== bNumber) {
        return aNumber - bNumber;
      }
    }

    // The numbers were always the same, so they are equal.
    return 0;
  });
};
