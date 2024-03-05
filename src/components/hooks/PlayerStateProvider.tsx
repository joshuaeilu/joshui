import { createContext } from "react";
import { Wheel } from "../../Types";
import React from "react";
import { useTimer } from "react-timer-hook";

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

  function setActiveWheel(wheel: Wheel) {
    const newPlayerState = {...playerState, wheel};
    newPlayerState.currentBgAudioIdx = 0;
    newPlayerState.currentStepIdx = 0;

    const bgAudio = newPlayerState.background_audio;
    bgAudio.src = wheel.background_audio[newPlayerState.currentBgAudioIdx].audio_url;
    bgAudio.onended = () => {
      newPlayerState.currentBgAudioIdx += 1;
      let nextAudio = wheel.background_audio[newPlayerState.currentBgAudioIdx]?.audio_url;
      if(nextAudio == null) {
        newPlayerState.currentBgAudioIdx = 0;
        nextAudio = wheel.background_audio[newPlayerState.currentBgAudioIdx].audio_url;
      }
      bgAudio.src = nextAudio;
      bgAudio.play();
    }

    bgAudio.play();

    setPlayerState(newPlayerState);
  }

  function playWheel() {
    const newPlayerState = {...playerState};

    newPlayerState.background_audio.play();
    newPlayerState.foreground_audio.play();

    setPlayerState(newPlayerState)
  }

  function pauseWheel() {
    const newPlayerState = {...playerState};

    newPlayerState.background_audio.pause();
    newPlayerState.foreground_audio.pause();

    setPlayerState(newPlayerState)
  }

  function advanceWheel() {
    const newPlayerState = {...playerState};

    if(newPlayerState.wheel == null) return;

    newPlayerState.currentStepIdx += 1;

    if(newPlayerState.currentStepIdx >= newPlayerState.wheel.steps.length) {
      newPlayerState.wheel = null;
      newPlayerState.foreground_audio.pause();
      newPlayerState.background_audio.pause();
      newPlayerState.foreground_audio.src = "";
      newPlayerState.background_audio.src = "";
      return;
    }

    newPlayerState.foreground_audio.src = newPlayerState.wheel.steps[newPlayerState.currentStepIdx].foreground_audio;
    playWheel()

    setPlayerState(newPlayerState)
  }

  return (
    <PlayerStateContext.Provider value={{playerState, setActiveWheel, playWheel, pauseWheel, advanceWheel}}>
      {children}
    </PlayerStateContext.Provider>
  )
}
