import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Dialog } from '@headlessui/react';

import NotationInput from './NotationInput';
import { Solution } from 'interfaces/data';
import Input from './Input';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.common.surface};
  border-radius: 4px;
  padding: 8px;
`;

interface NoteType {
  selected: boolean;
  title: string;
  detail: string[];
}
const Note = (props: NoteType) => {
  const { selected, title, detail } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    if (selected) inputRef.current?.focus();
  }, []);

  return (
    <Wrapper>
      {selected ? <Input ref={inputRef} /> : <div>{title}</div>}
      {detail.map((d) => (
        <div>{d}</div>
      ))}
    </Wrapper>
  );
};
Note.defaultProps = {
  detail: [],
  selected: false,
};

export default Note;
