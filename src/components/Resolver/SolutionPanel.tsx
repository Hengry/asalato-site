import React, { useEffect, useMemo, useState } from 'react';
import Notation from 'components/Notation';
import Tag from 'components/Tag';
import FilterIcon from 'components/icons/FilterIcon';
import { Solution } from 'interfaces/data';
import { useCallback } from 'react';

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
  const [openFilter, setOpenFilter] = useState<boolean>(false);

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
    return solutions.filter(({ tags }) =>
      tags.every((tag) => filters.includes(tag))
    );
  }, [solutions, filters]);

  return (
    <div className="absolute top-20 bottom-28 inset-x-0 m-4 overflow-auto">
      <div className="flex my-4 pb-0.5 border-b items-end">
        <div className="mr-1 mb-0.5">
          <FilterIcon />
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
      {openFilter && (
        <div className="flex flex-col space-y-4">
          {Object.keys(filterOptions).map((category) => (
            <div key={category} className="flex flex-col space-y-2">
              <div>{category}</div>
              {filterOptions[category].map((option) => (
                <div key={option}>
                  <Tag>{option}</Tag>
                  <div className="ml-2 inline">{option}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {filteredSolutions.map(({ text: { left, right }, tags }) => (
        <React.Fragment key={left + right}>
          <div className="flex mt-4">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <Notation values={[left, right]} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default SolutionPanel;
