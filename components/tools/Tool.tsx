import React from 'react';

import styled from '@emotion/styled';

import { Popover } from '@headlessui/react';
// interface ToolProps {
//   children: React.ReactNode;
// }
// const Tool = (props: ToolProps) => (
//   <Popover.Button
//     className={
//       'group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
//     }
//   >
//     {props.children}
//   </Popover.Button>
// );

const Tool = styled(Popover.Button)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export default Tool;
