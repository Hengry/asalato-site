import React, { useEffect, useMemo, useState } from 'react';
import Notation from 'components/Notation';
import Tag from 'components/Tag';
import FilterIcon from 'components/icons/FilterIcon';
import { Solution } from 'interfaces/data';

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

interface SolutionTableProps {
  solutions: Solution[];
}

const SolutionPanel = (props: SolutionTableProps) => {
  const { solutions } = props;
  const [filters, setFilters] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  return (
    <div className="absolute z-8 top-20 inset-x-0 m-4 p-2">
      <div className="flex mb-2 pb-0.5 border-b items-end">
        <div
          className="mr-1 mb-1"
          onClick={() => {
            setOpenFilter((prev) => !prev);
          }}
        >
          <FilterIcon />
        </div>
        {filters.map((option) => (
          <Tag key={option}>{option}</Tag>
        ))}
      </div>
      {openFilter && (
        <div className="flex flex-col space-y-4">
          {Object.keys(filterOptions).map((category) => (
            <div key={category} className="flex flex-col space-y-2">
              <div>{category}</div>
              {filterOptions[category].map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setFilters((prev) => {
                      if (prev.includes(option)) {
                        const index = filters.findIndex((e) => e === option);
                        prev.splice(index, 1);
                        return [...prev];
                      }
                      return prev.concat(option);
                    });
                  }}
                >
                  <Tag>{option}</Tag>
                  <div className="ml-2 inline">{option}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {solutions.map(({ text: { left, right }, tags }) => (
        <React.Fragment key={left + right}>
          <div className="flex">
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
