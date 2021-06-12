import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

export default () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        div {
          background: red;
          color: white;
        }
        body {
          background: ${theme.color.primary.main};
        }
      `}
    />
  );
};
