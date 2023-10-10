import React from 'react';
import tagAbbr from '@/utils/tagAbbr';

interface TagProps {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
const Tag = (props: TagProps) => {
  const { active = true, children, onClick } = props;
  const display = typeof children === 'string' ? tagAbbr(children) : children;
  return (
    <div
      className={`capitalize rounded-full ${
        active ? 'bg-gray-700' : 'bg-surface'
      } ${
        active ? '' : 'text-gray-500'
      } w-8 h-8 inline-flex justify-center items-center m-0.5 text-sm`}
      onClick={onClick}
    >
      {display}
    </div>
  );
};

export default Tag;
