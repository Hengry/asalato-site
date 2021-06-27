import React from 'react';
import tagAbbr from 'utils/tagAbbr';

interface TagProps {
  active: boolean;
  children: React.ReactNode;
}
const Tag = (props: TagProps) => {
  const { active, children } = props;
  const display = typeof children === 'string' ? tagAbbr(children) : children;
  return (
    <div
      className={`capitalize rounded-full ${
        active ? 'bg-gray-700' : 'bg-surface'
      } w-7 h-7 inline-flex justify-center items-center m-0.5 text-sm`}
    >
      {display}
    </div>
  );
};
Tag.defaultProps = {
  active: true,
};

export default Tag;
