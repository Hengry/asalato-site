import React, { useState } from 'react';
import { useCallback } from 'react';
import { useResolver } from 'src/hooks/resolver';
import ResolverButton from './tools/ResolverButton';
import SolutionPanel from './tools/SolutionPanel';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (s: string) => void;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, onChange, onSubmit } = props;
  const [input, setInput] = useState<string>('');
  const triggerResolver = useResolver();

  const handleSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      input: { value: string };
    };
    onSubmit(target.input.value);
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2">
        <input
          name="input"
          ref={ref}
          value={value}
          onChange={onChange}
          className="tracking-widest"
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="rounded">
          gogo
        </button>
      </div>
    </form>
  );
});

export default Input;
