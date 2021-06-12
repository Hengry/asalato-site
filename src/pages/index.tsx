import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider, css } from '@emotion/react';

import GlobalStyle from 'components/GlobalStyle';
import Note from 'components/Note';

import DarkTheme from 'themes/darkTheme';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: {
        main: string;
      };
    };
  }
}

const IndexPage = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <GlobalStyle />
      <title>Home Page</title>
      <Note title="test" />
    </ThemeProvider>
  );
};
// window.matchMedia('(prefers-color-scheme: dark)')
export default IndexPage;
