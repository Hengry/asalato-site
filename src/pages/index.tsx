import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { Dialog } from '@headlessui/react';

import GlobalStyle from 'components/GlobalStyle';
import Note from 'components/Note';
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
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={DarkTheme}>
      <Main>
        <GlobalStyle />
        <title>Home Page</title>
        <Note title="test" selected />
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Dialog.Overlay />

          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setOpen(false)}>Deactivate</button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </Dialog>
      </Main>
    </ThemeProvider>
  );
};
// window.matchMedia('(prefers-color-scheme: dark)')
export default IndexPage;
