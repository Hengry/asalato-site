import React, { useState } from 'react';
import { useCallback } from 'react';
import { useResolver } from 'src/hooks/resolver';
import ResolverButton from './tools/ResolverButton';
import SolutionPanel from './tools/SolutionPanel';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, onChange } = props;
  const [input, setInput] = useState<string>('');
  const triggerResolver = useResolver();

  return (
    <input
      name="input"
      ref={ref}
      value={value}
      onChange={onChange}
      className="tracking-widest"
    />
  );
});

export default Input;
