// Paragon light-theme tokens (primary/brand/success/info/danger families),
// chosen for WCAG-safe contrast with white text.
export const AVATAR_COLORS = [
  '#0A3055', // primary
  '#9D0054', // brand
  '#178253', // success (green)
  '#006DAA', // info (teal)
  '#C32D3A', // danger (red)
  '#476480', // primary-400
  '#B6407F', // brand-400
  '#15754B', // success-600
  '#006299', // info-600
  '#B02934', // danger-600
];

/**
 * Returns a deterministic background color for the given username.
 * Same username always maps to the same palette color.
 */
export const getAvatarColor = (username) => {
  let hash = 0;
  for (let i = 0; i < username.length; i += 1) {
    hash = ((hash << 5) - hash + username.charCodeAt(i)) | 0; // eslint-disable-line no-bitwise
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

/**
 * Returns the uppercased first character of the username.
 */
export const getInitial = (username) => username.charAt(0).toUpperCase();
