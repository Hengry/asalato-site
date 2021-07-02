import React, { useEffect, useRef, useState } from 'react';

interface NoteType {
  selected: boolean;
  title: string;
  detail: string[];
}
const Note = (props: NoteType) => {
  const { selected, title, detail } = props;

  return (
    <div className="rounded p-2 bg-surface">
      <div>{title}</div>
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
