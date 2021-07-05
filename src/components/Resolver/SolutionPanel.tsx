import React, { useCallback, useMemo, useState } from 'react';
import Notation from 'components/Notation';
import Tag from 'components/Tag';
import SearchIcon from 'components/icons/SearchIcon';
import { Solution } from 'interfaces/data';

import SolutionDirection from './SolutionDirection';

const recommandSetting = {
  begineer: {
    startDirection: ['forward'],
    cycle: ['symmetry'],
    technique: ['airTurn', 'click'],
  },
  expert: {
    startDirection: ['forward', 'backward', 'twoWay'],
    cycle: ['antisymmetry', 'symmetry'],
    technique: ['airTurn', 'click'],
  },
};

const filterOptions: { [k: string]: string[] } = {
  startDirection: ['forward', 'backward', 'twoWay'],
  cycle: ['antisymmetry', 'symmetry'],
  technique: ['airTurn', 'click'],
};
const options: string[] = Object.keys(filterOptions).reduce<string[]>(
  (accu, category) => {
    return accu.concat(filterOptions[category]);
  },
  []
);

interface SolutionTableProps {
  solutions: Solution[];
}

const SolutionPanel = (props: SolutionTableProps) => {
  const { solutions } = props;
  const [filters, setFilters] = useState<string[]>(options);

  const handleFilterTagClicked = useCallback(
    (option) => () => {
      setFilters((prev) => {
        if (prev.includes(option)) {
          const index = prev.findIndex((e) => e === option);
          const newArray = [...prev];
          newArray.splice(index, 1);
          return newArray;
        }
        return prev.concat(option);
      });
    },
    []
  );

  const filteredSolutions = useMemo(() => {
    return solutions
      .map((solution) => ({
        ...solution,
        key: solution.text.left + solution.text.right,
      }))
      .filter(({ tags }) => tags.every((tag) => filters.includes(tag)));
  }, [solutions, filters]);

  return (
    <div className="relative flex-1 mx-4 overflow-auto text-center">
      <div className="inline-flex mt-4 pb-0.5 items-center relative">
        <div className="mr-2 mt-1 text-gray-500 absolute right-full">
          <SearchIcon />
        </div>
        {options.map((option) => (
          <Tag
            key={option}
            active={filters.includes(option)}
            onClick={handleFilterTagClicked(option)}
          >
            {option}
          </Tag>
        ))}
      </div>
      <SolutionDirection />
      <div className="flex px-2 py-1 text-gray-500">
        {filteredSolutions.length} results
      </div>
      {filteredSolutions.map(({ key, text, tags }, index) => (
        <div key={key} className="table py-1">
          <div className="flex items-center">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            <div className="ml-auto">{index + 1}</div>
          </div>
          <Notation values={text} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(SolutionPanel);
