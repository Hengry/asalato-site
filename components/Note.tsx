import React, { useEffect, useRef, useState } from 'react';

interface NoteType {
  selected: boolean;
  title: string;
  detail: string[];
}
const Note = (props: NoteType) => {
  const { selected = false, title, detail = [] } = props;

  return (
    <div className='rounded p-2 bg-surface'>
      <div>{title}</div>
      {detail.map((d) => (
        <div>{d}</div>
      ))}
    </div>
  );
};

export default Note;
