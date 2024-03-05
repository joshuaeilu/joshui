import { createContext } from "react";
import { Wheel } from "../../Types";
import React from "react";

export type PlayerState = {
  wheel: Wheel | null;
  currentStepIdx: number;
  background_audio: HTMLAudioElement;
  foreground_audio: HTMLAudioElement;
}

export const defaultPlayerStateContext = {
  wheel: null,
  currentStepIdx: 0,
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
    newPlayerState.background_audio.src = "https://www.kozco.com/tech/LRMonoPhase4.mp3";
    newPlayerState.background_audio.load();
    setPlayerState(newPlayerState);
  }

  return (
    <PlayerStateContext.Provider value={{playerState, setActiveWheel}}>
      {children}
    </PlayerStateContext.Provider>
  )
}
