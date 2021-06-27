import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { Dialog } from '@headlessui/react';
import '@fontsource/space-mono';

import GlobalStyle from 'components/GlobalStyle';
import Note from 'components/Note';
import Resolver from 'components/Resolver';
import DarkTheme from 'themes/darkTheme';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
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
  // const [resolverInput, openResolver, triggerResolver] = useInitResolver();
  const [resolverInput, triggerResolver] = useState();

  return (
    <ThemeProvider theme={DarkTheme}>
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
        rel="stylesheet"
      ></link>
      <Main>
        <GlobalStyle />
        <title>Asalato Resolver</title>
        {/* <Note title="test" selected /> */}
        <div className="absolute bottom-0 inset-x-0 p-4 flex justify-end">
          <Resolver />
        </div>
      </Main>
    </ThemeProvider>
  );
};
// window.matchMedia('(prefers-color-scheme: dark)')
export default IndexPage;
