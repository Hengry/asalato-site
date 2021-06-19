import React, { useState } from 'react';
import { useCallback } from 'react';
import { useResolver } from 'src/hooks/resolver';
import ResolverButton from './tools/ResolverButton';
import SolutionPanel from './tools/SolutionPanel';

interface InputProps {}
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [input, setInput] = useState<string>('');
  const triggerResolver = useResolver();

  const handleSubmit = (a) => {
    console.log(handleSubmit);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input ref={ref} />
      <button type="submit" className="rounded">
        gogo
      </button>
    </form>
  );
});

export default Input;
