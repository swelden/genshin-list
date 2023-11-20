export const myRound = (num: number, precision: number): number => {
  const multiplier = 10 ** precision;
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
};
