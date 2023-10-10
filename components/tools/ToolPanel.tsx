import React from 'react';

import styled from '@emotion/styled';

import { Popover, Dialog } from '@headlessui/react';
import { useTheme } from '@emotion/react';

interface ToolPanelProps {
  children: React.ReactNode;
}

const ToolPanel = (props: ToolPanelProps) => {
  const { children } = props;

  return (
    <Popover.Panel className="bg-surface absolute z-10 max-w-sm mx-4 mt-3 inset-x-0 sm:px-0 lg:max-w-3xl">
      {children}
    </Popover.Panel>
  );
};

export default ToolPanel;
