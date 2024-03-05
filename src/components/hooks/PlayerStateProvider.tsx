import { createContext } from "react";
import { Wheel } from "../../Types";
import React from "react";

export type PlayerState = {
  wheel: Wheel | null;
  currentStepIdx: number;
  currentBgAudioIdx: number;
  background_audio: HTMLAudioElement;
  foreground_audio: HTMLAudioElement;
}

export const defaultPlayerStateContext = {
  wheel: null,
  currentStepIdx: 0,
  currentBgAudioIdx: 0,
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
    newPlayerState.currentBgAudioIdx = 0;
    newPlayerState.currentStepIdx = 0;

    const bgAudio = newPlayerState.background_audio;
    bgAudio.src = wheel.background_audio[newPlayerState.currentBgAudioIdx].audio_file;
    bgAudio.onended = () => {
      newPlayerState.currentBgAudioIdx += 1;
      let nextAudio = wheel.background_audio[newPlayerState.currentBgAudioIdx]?.audio_file;
      if(nextAudio == null) {
        newPlayerState.currentBgAudioIdx = 0;
        nextAudio = wheel.background_audio[newPlayerState.currentBgAudioIdx].audio_file;
      }
      bgAudio.src = nextAudio;
      bgAudio.play();
    }

    const fgAudio = newPlayerState.foreground_audio;
    fgAudio.src = wheel.steps[0].foreground_audio;
    
    fgAudio.play();
    bgAudio.play();

    setPlayerState(newPlayerState);
  }

  return (
    <PlayerStateContext.Provider value={{playerState, setActiveWheel}}>
      {children}
    </PlayerStateContext.Provider>
  )
}
