import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  border: 1px solid #000;
`;

interface NoteType {
  title: string;
  detail: string[];
}
const Note = (props: NoteType) => {
  const { title, detail } = props;

  return (
    <Wrapper>
      <h3>{title}</h3>
      {detail.map((d) => (
        <div>{d}</div>
      ))}
    </Wrapper>
  );
};
Note.defaultProps = {
  detail: [],
};

export default Note;
