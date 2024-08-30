export const classNames = (...classes: Array<string | boolean>): string =>
  classes.filter(Boolean).join(' ');

export const removeLeadingTrailingSlashes = (str: string): string =>
  str?.replace(/^\/|\/$/g, '') || '';
