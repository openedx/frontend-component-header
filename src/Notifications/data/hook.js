import { breakpoints, useWindowSize } from '@edx/paragon';

export function useIsOnDesktop() {
  const windowSize = useWindowSize();
  return windowSize.width >= breakpoints.medium.minWidth;
}
export function useIsOnXLDesktop() {
  const windowSize = useWindowSize();
  return windowSize.width >= breakpoints.extraLarge.minWidth;
}
