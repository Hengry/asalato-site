import React from 'react';
import tagAbbr from 'utils/tagAbbr';

interface TagProps {
  children: React.ReactNode;
}
const Tag = (props: TagProps) => {
  const { children } = props;
  const display = typeof children === 'string' ? tagAbbr(children) : children;
  return (
    <div className="capitalize rounded-full bg-gray-700 w-8 h-8 inline-flex justify-center items-center mx-1">
      {display}
    </div>
  );
};

export default Tag;
