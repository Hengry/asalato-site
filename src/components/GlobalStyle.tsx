import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

export default () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        body {
          background: ${theme.colors.common.background};
          margin: 0px;
          color: ${theme.colors.common.text};
          font-family: 'Space Mono';
        }
        input {
          color: ${theme.colors.common.text};
          font-family: 'Space Mono';
          font-size: 16px;
          background-color: transparent;
          border-bottom: 1px solid ${theme.colors.common.text};
          border-radius: 0px;
          -webkit-appearance: none;
          padding: 0px;
          z-index: 1;
          height: 24px;
          &:focus {
            outline: none;
          }
        }
        button:focus {
          outline: none;
          user-select: none;
        }
      `}
    />
  );
};
