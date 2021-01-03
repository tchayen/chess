export const arrayEqual = (a: any[], b: any[]) => {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((_, i) => a[i] === b[i]);
};
