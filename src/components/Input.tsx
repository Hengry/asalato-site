import React, { useState } from 'react';
import Solver from './tools/Resolver';

interface InputProps {}
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [rythm, setRythm] = useState<string>('');
  return (
    <div>
      <input
        ref={ref}
        value={rythm}
        onChange={(e) => {
          setRythm(e.target.value);
        }}
      />
      <Solver />
    </div>
  );
});

export default Input;
