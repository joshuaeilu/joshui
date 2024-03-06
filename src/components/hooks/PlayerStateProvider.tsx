import { createContext, useContext } from "react";
import { Wheel } from "../../Types";
import React from "react";
import { TimerContext } from "./TimerProvider";

export type PlayerState = {
  wheel: Wheel | null;
  curStpIdx: number;
  currentBgAudioIdx: number;
  backgroundAudio: HTMLAudioElement;
  foregroundAudio: HTMLAudioElement;
}

export const defaultPlayerStateContext = {
  wheel: null,
  curStpIdx: 0,
  currentBgAudioIdx: 0,
  backgroundAudio: new Audio(),
  foregroundAudio: new Audio()
};

export const PlayerStateContext = createContext<{
  playerState: PlayerState
  setActiveWheel: (wheel: Wheel) => void
  playWheel: () => void
  pauseWheel: () => void
  advanceWheel: () => void
} | null>(null);

export function PlayerStateProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [playerState, setPlayerState] = React.useState<PlayerState>(defaultPlayerStateContext);

  const timerContext = useContext(TimerContext)!;

  const timerSeconds = timerContext.timer.timerSeconds;
  const setTimer = timerContext.setTimer;
  const interval = timerContext.interval;

  React.useEffect(() => {
    if(timerSeconds <= 0) {
      advanceWheel();
    }
  }, [timerSeconds]);

  function setActiveWheel(wheel: Wheel) {
    const newPS = {...playerState, wheel};
    newPS.currentBgAudioIdx = 0;
    newPS.curStpIdx = 0;

    const bgAudio = newPS.backgroundAudio;
    bgAudio.src = wheel.background_audio[newPS.currentBgAudioIdx].audio_url;
    bgAudio.onended = () => {
      newPS.currentBgAudioIdx += 1;
      let nextAudio = wheel.background_audio[newPS.currentBgAudioIdx]?.audio_url;
      if(nextAudio == null) {
        newPS.currentBgAudioIdx = 0;
        nextAudio = wheel.background_audio[newPS.currentBgAudioIdx].audio_url;
      }
      bgAudio.src = nextAudio;
      bgAudio.play();
    }

    bgAudio.play();

    setTimer({timerSeconds: newPS.wheel.steps[newPS.curStpIdx].length/1000})
    interval()

    setPlayerState(newPS);
  }

  function playWheel() {
    const newPS = {...playerState};

    newPS.backgroundAudio.play();
    newPS.foregroundAudio.play();

    setPlayerState(newPS)
  }

  function pauseWheel() {
    const newPS = {...playerState};

    newPS.backgroundAudio.pause();
    newPS.foregroundAudio.pause();

    setPlayerState(newPS)
  }

  function advanceWheel() {
    const newPS = {...playerState};

    if(newPS.wheel == null) return;

    newPS.curStpIdx += 1;

    if(newPS.curStpIdx >= newPS.wheel.steps.length) {
      newPS.wheel = null;
      newPS.foregroundAudio.pause();
      newPS.backgroundAudio.pause();
      newPS.foregroundAudio.src = "";
      newPS.backgroundAudio.src = "";
      return;
    }

    setTimer({timerSeconds: newPS.wheel.steps[newPS.curStpIdx].length/1000})
    interval()

    newPS.foregroundAudio.src = newPS.wheel.steps[newPS.curStpIdx].foregroundAudio;
    playWheel()

    setPlayerState(newPS)
  }

  return (
    <PlayerStateContext.Provider value={{playerState, setActiveWheel, playWheel, pauseWheel, advanceWheel}}>
      {children}
    </PlayerStateContext.Provider>
  )
}
