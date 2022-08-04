import '@emotion/react';

import { ITheme } from '../src/utilities/theme';

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
