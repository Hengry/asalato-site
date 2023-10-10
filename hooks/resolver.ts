import React, {
  Dispatch,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export const ResolverContext = React.createContext((s: string) => {});

export const useResolver = () => useContext(ResolverContext);

export const useInitResolver = (): [string, boolean, (s: string) => void] => {
  const [resolverInput, setResolverInput] = useState<string>('');
  const [openResolver, setOpenResolver] = useState<boolean>(false);
  const triggerResolver = useCallback((input) => {
    setResolverInput(input);
    setOpenResolver(true);
  }, []);
  return [resolverInput, openResolver, triggerResolver];
};
