export const repeat = (times: number): undefined[] => {
  return Array.from({length: times}, () => undefined);
}