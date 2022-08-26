import '@emotion/react';

import { ITheme } from './utils/theme';

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
