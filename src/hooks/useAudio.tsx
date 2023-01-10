import { useState, useEffect } from "react";

const useAudio = (url: string) => {
  const [relativeEndDate, setRelativeEndDate] = useState(false); // for demo only
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const audio = new Audio(url);
    const onPlay = () => audio.play();

    if (play && relativeEndDate) {
      audio.addEventListener("canplaythrough", onPlay);
    }

    return () => {
      if (audio) {
        audio.pause(); // to enable garbage collection
        audio.removeEventListener("canplaythrough", onPlay);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, relativeEndDate]);

  const onStart = () => {
    setPlay(true);
    // to demo that only when play and relativeEndDate
    // is true then the audio will play
    setTimeout(() => setRelativeEndDate(true), 1000);
  };

  return [onStart];
};

export default useAudio;
