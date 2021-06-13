import React, { useState } from 'react';
import Solver from './tools/Solver';

interface InputProps {}
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [rythm, setRythm] = useState<string>('');
  return (
    <div>
      <input
        ref={ref}
        value={rythm}
        onChange={(e) => {
          console.log(e.target.value);
          setRythm(e.target.value + 'a');
        }}
      />
      <Solver />
    </div>
  );
});

export default Input;
