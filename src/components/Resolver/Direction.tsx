import React, { useState } from 'react';

import QuestionMarkCircleIcon from 'components/icons/QuestionMarkCircleIcon';

const Direction = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="absolute right-0 top-0 z-10 p-4"
        onClick={() => {
          setOpen(true);
        }}
      >
        <QuestionMarkCircleIcon />
      </button>
      {open && (
        <div
          className="absolute inset-0 z-20 bg-opacity-80 bg-background text-3xl"
          onClick={() => {
            setOpen(false);
          }}
        >
          <div className="m-4 h-24 border-4 rounded-xl flex justify-center items-center">
            Input Area 1
          </div>
          <div className="absolute bottom-60 top-28 inset-x-0 m-4 text-base">
            <div className="my-4">
              1 character represent 1 half-beat. ex. Flip-Flop shows as X__X__
            </div>
            <div className="flex pt-4">
              <div className="mr-3">X:</div>
              <div>
                beat, key in 'X', 'x', '1' or tap the 'X' in Input Area 2
              </div>
            </div>
            <div className="flex mt-4">
              <div className="mr-3">_:</div>
              <div>
                off-beat, key in any other keys or tap the '_' in Input Area 2
              </div>
            </div>
          </div>
          <div className="absolute bottom-60 right-0 m-4 text-base">
            Click to exit.
          </div>
          <div className="absolute bottom-32 inset-x-0 m-4 h-24 border-4 rounded-xl flex justify-center items-center">
            Input Area 2
          </div>
          <div className="absolute bottom-0 inset-x-0 m-4 h-24 border-4 rounded-xl flex justify-center items-center">
            Action Area
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Direction);
