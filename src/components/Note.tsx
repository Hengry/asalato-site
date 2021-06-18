import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Dialog } from '@headlessui/react';

import NotationInput from './NotationInput';
import { Solution } from 'interfaces/data';
import Input from './Input';

interface NoteType {
  selected: boolean;
  title: string;
  detail: string[];
}
const Note = (props: NoteType) => {
  const { selected, title, detail } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selected) inputRef.current?.focus();
  }, []);

  return (
    <div className="rounded p-2 bg-surface">
      {selected ? <Input ref={inputRef} /> : <div>{title}</div>}
      {detail.map((d) => (
        <div>{d}</div>
      ))}
    </div>
  );
};
Note.defaultProps = {
  detail: [],
  selected: false,
};

export default Note;
