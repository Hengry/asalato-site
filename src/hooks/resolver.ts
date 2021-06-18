import React, { Dispatch, useContext } from 'react';

export const ResolverContext = React.createContext<Dispatch<string>>(
  (s: string) => {}
);

export const useResolver = () => useContext(ResolverContext);
