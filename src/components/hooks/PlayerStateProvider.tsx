import { createContext } from "react";
import { Wheel } from "../../Types";
import React from "react";

export type PlayerState = {
  wheel: Wheel | null;
  currentStepIdx: number;
  currentBackgroundAudioIdx: number;
  background_audio: HTMLAudioElement;
  foreground_audio: HTMLAudioElement;
}

export const defaultPlayerStateContext = {
  wheel: null,
  currentStepIdx: 0,
  currentBackgroundAudioIdx: 0,
  background_audio: new Audio(),
  foreground_audio: new Audio()
};

export const PlayerStateContext = createContext<{
  playerState: PlayerState
  setActiveWheel: (wheel: Wheel) => void
} | null>(null);

export function PlayerStateProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [playerState, setPlayerState] = React.useState<PlayerState>(defaultPlayerStateContext);

  function setActiveWheel(wheel: Wheel) {
    const newPlayerState = {...playerState, wheel};
    const bgAudio = newPlayerState.background_audio;
    newPlayerState.currentBackgroundAudioIdx = 0;
    newPlayerState.currentStepIdx = 0;
    bgAudio.src = wheel.background_audio[newPlayerState.currentBackgroundAudioIdx].audio_file;
    bgAudio.onended = () => {
      newPlayerState.currentBackgroundAudioIdx += 1;
      let nextAudio = wheel.background_audio[newPlayerState.currentBackgroundAudioIdx]?.audio_file;
      if(nextAudio == null) {
        newPlayerState.currentBackgroundAudioIdx = 0;
        nextAudio = wheel.background_audio[newPlayerState.currentBackgroundAudioIdx].audio_file;
      }
      bgAudio.src = nextAudio;
      bgAudio.load();
      bgAudio.play();
    }
    bgAudio.load();
    bgAudio.play();
    setPlayerState(newPlayerState);
  }

  return (
    <PlayerStateContext.Provider value={{playerState, setActiveWheel}}>
      {children}
    </PlayerStateContext.Provider>
  )
}
