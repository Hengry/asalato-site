import React, { useCallback, useEffect, useRef, useState } from 'react';

const Tapper = () => {
  const ref = useRef<number[]>([]);

  useEffect(() => {
    // Create the audio context
    const audioContext = new window.AudioContext();

    // create an oscillator
    const osc = audioContext.createOscillator();

    // Set the sound frequency
    osc.frequency.value = 523.25;

    // Connect the oscillator to the output destination
    osc.connect(audioContext.destination);

    // Start the oscilator in 1 second and stop after a short time
    osc.start(audioContext.currentTime + 1);
    osc.stop(audioContext.currentTime + 2);

    return () => {
      ref.current = [];
    };
  }, []);

  const handleClick = useCallback(() => {
    ref.current.push(+new Date());
  }, []);

  const handleSubmit = useCallback(() => {
    const data = [...ref.current];
    let prev = data.shift() || 0;
    const intervals = data.map((current) => {
      const value = current - prev;
      prev = current;
      return value;
    });
    console.log(ref.current);
    console.log('intervals', intervals);
    ref.current = [];
  }, []);

  return (
    <div>
      <div onClick={handleClick}>Click</div>
      <div onClick={handleSubmit}>result</div>
    </div>
  );
};

export default Tapper;
