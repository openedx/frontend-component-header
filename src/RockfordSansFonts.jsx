import { useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';

// LMS indigo ships Rockford Sans under /static/indigo/fonts/.
// MFEs must load those faces explicitly — setting font-family alone is not enough
// when PARAGON_THEME_URLS is empty or @font-face URLs do not resolve on the MFE origin.
const FACES = [
  [400, 'Regular'],
  [500, 'Medium'],
  [600, 'Medium'],
  [700, 'Bold'],
];

const STYLE_ID = 'lw-rockford-sans-fonts';

const RockfordSansFonts = () => {
  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) {
      return undefined;
    }
    const base = getConfig().LMS_BASE_URL;
    if (!base) {
      return undefined;
    }
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = FACES.map(([weight, file]) => `
      @font-face {
        font-family: 'Rockford Sans';
        src: url('${base}/static/indigo/fonts/RockfordSans-${file}.otf') format('opentype');
        font-weight: ${weight};
        font-style: normal;
        font-display: swap;
      }
    `).join('\n');
    document.head.appendChild(style);
    return undefined;
  }, []);

  return null;
};

export default RockfordSansFonts;
