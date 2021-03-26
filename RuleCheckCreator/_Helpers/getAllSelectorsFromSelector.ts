// From ["foo", "bar", "baz"] this creates [["foo"], ["foo", "bar"], ["foo", "bar", "baz"]].
export const getAllSelectorsFromSelector = (selector: string[]): string[][] =>
  selector.map((_, i) => selector.slice(0, i + 1));
