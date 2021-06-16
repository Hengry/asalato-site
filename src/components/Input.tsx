import React, { useState } from 'react';
import Resolver from './tools/Resolver';
import SolutionPanel from './tools/SolutionPanel';

interface InputProps {}
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [input, setInput] = useState<string>('');
  return (
    <div>
      <input
        ref={ref}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Resolver
        onSubmit={(trigger) => {
          trigger(input);
        }}
      />
    </div>
  );
});

export default Input;
