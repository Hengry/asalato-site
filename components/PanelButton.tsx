import React from 'react';

const backgroundColor = {
  main: 'bg-gray-700',
  transparent: 'bg-transparent',
};
interface PanelButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: 'main' | 'transparent';
}
const PanelButton = (props: PanelButtonProps) => {
  const { children, type, onClick, color } = props;
  return (
    <button
      type={type}
      className={`rounded-3xl inline-block ${
        color ? backgroundColor[color] : 'bg-surface'
      } h-24 w-24 m-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
PanelButton.defaultProps = {
  type: 'button',
};

export default PanelButton;
