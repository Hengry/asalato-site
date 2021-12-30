import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { Dialog } from '@headlessui/react';
import '@fontsource/space-mono';

import GlobalStyle from 'components/GlobalStyle';
import Note from 'components/Note';
import Resolver from 'components/Resolver';
import DarkTheme from 'themes/darkTheme';
import Tapper from 'components/Tapper';

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

const IndexPage = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
        rel="stylesheet"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <GlobalStyle />
      <title>Asalato Resolver</title>
      <div className="fixed inset-4 flex flex-col">
        <h1 className="text-3xl text-center mt-4">Asalato Resolver</h1>
        <div className="text-right">Created by Hengry</div>
        <div className="flex-1 m-4 flex flex-col">
          <p className="my-4">Tap the asalato to start Asalato Resolver.</p>
          <p className="my-4">Current space is preserve for other functions.</p>
          <p className="my-4">Current version is priority to device.</p>
        </div>
        <div className="absolute bottom-0 inset-x-0 p-4 flex justify-end">
          <Tapper />
          <Resolver />
        </div>
      </div>
    </ThemeProvider>
  );
};
// window.matchMedia('(prefers-color-scheme: dark)')
export default IndexPage;
