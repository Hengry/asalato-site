import React, { Ref } from 'react';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import Notation from 'components/Notation';

const blinking = keyframes`
  from, to { border-color: #FFF }
  50% { border-color: transparent }
`;

const StyledInput = styled.input`
  font-size: 20px;
  font-family: monospace;
  font-weight: bold;
  background-color: transparent;
  width: 11px;
  z-index: 1;
  /* caret-color: transparent; */
  height: 18px;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.color.common.text};
    animation: ${blinking} 1s step-end infinite;
  }
`;

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (rythm: string) => void;
};

const NotationInput = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref: Ref<HTMLInputElement>) => {
    const { handleSubmit } = props;
    const [rythm, setRythm] = useState<string>('');

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      e.preventDefault();
      if (key === 'Enter') {
        handleSubmit(rythm);
      } else if (key === 'Backspace') {
        setRythm((s) => s.slice(0, -1));
      } else if (key === ' ' || key === '0') {
        setRythm((s) => `${s}_`);
      } else if (key.length === 1) {
        setRythm((s) => `${s}X`);
      }
    };

    return (
      <>
        <Notation
          endStyle="none"
          onClick={() => {
            ref?.current?.focus();
          }}
        >
          {rythm}
          <StyledInput
            spellCheck={false}
            key="input"
            ref={ref}
            onKeyDown={handleKeyDown}
          />
        </Notation>
        <input
          className="bg-transparent"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(rythm);
          }}
        />
      </>
    );
  }
);

export default NotationInput;
