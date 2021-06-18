import React, { useState } from 'react';
import { useCallback } from 'react';
import { useResolver } from 'src/hooks/resolver';
import ResolverButton from './tools/ResolverButton';
import SolutionPanel from './tools/SolutionPanel';

interface InputProps {}
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [input, setInput] = useState<string>('');
  const triggerResolver = useResolver();
  const handleButtonClicked = useCallback(() => {
    triggerResolver(ref.current?.value);
  }, [ref]);
  return (
    <div>
      <input
        ref={ref}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <ResolverButton onClick={handleButtonClicked} />
    </div>
  );
});

export default Input;
