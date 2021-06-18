import React from 'react';

interface ResolverButtonProp {
  onClick: () => void;
}
export default (props: ResolverButtonProp) => {
  const { onClick } = props;
  return (
    <div
      className="rounded-full w-6 h-6 bg-main flex items-center justify-center"
      onClick={onClick}
    >
      A
    </div>
  );
};
