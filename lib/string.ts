const spacesRegex = / /g;

/**
 * Removes all spaces from a string.
 * @param s The string to remove spaces from.
 * @returns The string with all spaces removed.
 */
export function squash(s: string) {
  return s.replace(spacesRegex, "");
}
