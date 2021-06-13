import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

export default () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        body {
          background: ${theme.color.common.background};
          margin: 0px;
          color: ${theme.color.common.text};
          font-family: monospace;
        }
        input {
          color: ${theme.color.common.text};
          font-family: monospace;
          font-size: 20px;
          background-color: transparent;
          z-index: 1;
          height: 18px;
          &:focus {
            outline: none;
          }
        }
      `}
    />
  );
};
