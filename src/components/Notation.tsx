import React from 'react';
import { ReactNode, Children, useMemo } from 'react';
import chunk from 'lodash/chunk';
import range from 'lodash/range';
import clsx from 'clsx';

import styled from '@emotion/styled';

const Wrapper = styled.div`
  letter-spacing: 4px;
  position: relative;
  padding: 0px 0px;
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 2px -1px;
  }
`;

const SideLine = styled.div`
  left: 4px;
  height: 100%;
  display: inline;
  position: absolute;
  border-left: 2px solid ${({ theme }) => theme.colors.common.text};
  border-right: 2px solid ${({ theme }) => theme.colors.common.text};
  left: -3px;
  width: 6px;
  background-color: ${({ theme }) => theme.colors.primary.dark};
`;

const Beat = styled.div`
  padding: 4px 4px;
  display: inline;
`;

const Bar = styled.div`
  padding: 0px 8px;
  display: inline-flex;
  border-left: 2px solid ${({ theme }) => theme.colors.common.text};
  border-right: 2px solid ${({ theme }) => theme.colors.common.text};
  &.multi-line {
    display: flex;
    flex-direction: column;
  }
  &.none:last-child {
    border-right: none;
  }
`;

type NotationProps = {
  children?: ReactNode;
  startStyle: 'default' | 'none' | 'repeat';
  endStyle: 'default' | 'none' | 'repeat';
  onClick?: () => void;
  values?: string[];
};
const Notation = (props: NotationProps) => {
  const { values, children, startStyle, endStyle, onClick } = props;
  const meter = 4;

  const childrenArray = useMemo(() => {
    let splitedArray: ReactNode[] = [];
    const array: ReactNode[] = Children.toArray(children);
    array.forEach((child) => {
      const newElement = typeof child === 'string' ? Array.from(child) : child;
      splitedArray = splitedArray.concat(newElement);
    });
    return splitedArray;
  }, [children]);

  const { length } = values ? values[0] : childrenArray;

  return (
    <Wrapper onClick={onClick}>
      {startStyle !== 'none' && (
        <div className="relative" style={{ margin: '2px 0px' }}>
          <SideLine />
        </div>
      )}
      {chunk(range(length), 2 * meter).map((indices, i) => (
        <Bar key={i} className={clsx(endStyle, values && 'multi-line')}>
          {values
            ? values.map((value, key) => (
                <div key={key}>
                  {chunk(indices, 2).map((indices2, i2) => (
                    <Beat key={i2}>
                      {indices2.map((index) => value[index])}
                    </Beat>
                  ))}
                </div>
              ))
            : chunk(indices, 2).map((indices2, i2) => (
                <Beat key={i2}>
                  {indices2.map((index) => childrenArray[index])}
                </Beat>
              ))}
        </Bar>
      ))}
      {endStyle !== 'none' && (
        <div className="relative" style={{ margin: '2px 0px' }}>
          <SideLine />
        </div>
      )}
    </Wrapper>
  );
};
Notation.defaultProps = {
  startStyle: 'default',
  endStyle: 'default',
};

export default Notation;
