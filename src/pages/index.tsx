import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider, css } from '@emotion/react';

import GlobalStyle from 'components/GlobalStyle';
import Note from 'components/Note';
import DarkTheme from 'themes/darkTheme';
import a from 'utils';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: {
        main: string;
        dark: string;
        light: string;
      };
      grey: {
        '50': string;
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
        '800': string;
        '900': string;
      };
      common: {
        text: string;
        background: string;
        surface: string;
      };
    };
  }
}

const Main = styled.div`
  margin: 16px;
`;

const IndexPage = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Main>
        <GlobalStyle />
        <title>Home Page</title>
        <Note title="test" selected />
      </Main>
    </ThemeProvider>
  );
};
// window.matchMedia('(prefers-color-scheme: dark)')
export default IndexPage;
