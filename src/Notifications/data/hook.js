import { breakpoints, useWindowSize } from '@edx/paragon';

export function useIsOnMediumScreen() {
  const windowSize = useWindowSize();
  return breakpoints.large.maxWidth > windowSize.width && windowSize.width >= breakpoints.medium.minWidth;
}

export function useIsOnLargeScreen() {
  const windowSize = useWindowSize();
  return windowSize.width >= breakpoints.extraLarge.minWidth;
}
