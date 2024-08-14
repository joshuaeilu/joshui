import { createContext, useContext } from "react";
import { Step, Wheel } from "../../Types";
import React from "react";
import { TimerContext } from "./TimerProvider";
import { AppSettingsContext } from "./AppSettingsContext";
import singleBeepMP3 from '../../assets/single_beep.mp3';
import headsUpMP3 from '../../assets/heads_up.mp3';
import wheelCompleteMP3 from '../../assets/wheel_complete.mp3';

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

export const PlayerStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerState, setPlayerState] = React.useState<PlayerState>(defaultPlayerStateContext);
  const [paused, setPaused] = React.useState(false);

  const settingsContext = useContext(AppSettingsContext);
  if (settingsContext == null) return null;
  const { settings } = settingsContext;

  const timerContext = useContext(TimerContext)!;

  const { timerSeconds } = timerContext.timer;
  const { stopTimer, startTimer, setTimerSecs } = timerContext;

  React.useEffect(() => {
    if (playerState.wheel != null && !paused && settings.headsUpBeep.enabled) {
      if (Math.abs(timerSeconds - (playerState.wheel?.steps[playerState.curStpIdx]?.length ?? 100) / 2000) <= 0.9) {
        const singleBeep = new Audio(singleBeepMP3);
        singleBeep.volume = settings.headsUpBeep.volume / 100;
        singleBeep.play();
      }

      if (timerSeconds - 5 == 0) {
        const headsUp = new Audio(headsUpMP3)
        headsUp.volume = settings.headsUpBeep.volume / 100;
        headsUp.play();
      }
    }
    if (timerSeconds <= 0) {
      advanceWheel();
    }
  }, [timerContext.timer, paused]);

  const updateSettings = () => {
    const newPS = { ...playerState }
    newPS.backgroundAudio.volume = settings.music.enabled ? settings.music.volume / 100 : 0;
    newPS.foregroundAudio.volume = settings.voice.enabled ? settings.voice.volume / 100 : 0;
    setPlayerState(newPS)
  }

  React.useEffect(() => {
    updateSettings()
  }, [settingsContext.settings]);

  const setActiveWheel = (wheel: Wheel) => {
    const newPS = { ...playerState, wheel };
    newPS.currentBgAudioIdx = Math.floor(Math.random() * wheel.background_audio.length);
    newPS.curStpIdx = 0;

    const bgAudio = newPS.backgroundAudio;
    if (wheel.steps[newPS.curStpIdx].override_song != null) {
      bgAudio.src = wheel.steps[newPS.curStpIdx].override_song;
    } else {
      bgAudio.src = wheel.background_audio[newPS.currentBgAudioIdx]?.audio_url;
    }
    bgAudio.load()

    bgAudio.onended = () => {
      newPS.currentBgAudioIdx += 1;
      let nextAudio = wheel.background_audio[newPS.currentBgAudioIdx]?.audio_url;
      if (!settings.shufflePlaylists) {
        if (nextAudio == null) {
          newPS.currentBgAudioIdx = 0;
          nextAudio = wheel.background_audio[newPS.currentBgAudioIdx]?.audio_url;
        }
      } else {
        nextAudio = wheel.background_audio[Math.floor(Math.random() * wheel.background_audio.length)]?.audio_url;
      }
      bgAudio.src = nextAudio;
      bgAudio.load();
      bgAudio.play();
    }

    setTimerSecs(newPS.wheel.steps[newPS.curStpIdx].length / 1000)

    newPS.foregroundAudio.src = newPS.wheel.steps[newPS.curStpIdx].foreground_audio;
    newPS.foregroundAudio.load()

    setUpMediaSession(newPS.wheel, newPS.wheel.steps[newPS.curStpIdx], playWheel, pauseWheel, advanceWheel)

    updateSettings()
    playWheel()
    setPlayerState(newPS)
  }

  const playWheel = () => {
    const audioFailFunc = () => {
      console.error("Audio failed to play.")
    }

    updateSettings()
    playerState.backgroundAudio.play().catch(audioFailFunc)
    playerState.foregroundAudio.play().catch(audioFailFunc)
    startTimer()

    if(playerState.wheel) {
      setUpMediaSession(playerState.wheel, playerState.wheel.steps[playerState.curStpIdx], playWheel, pauseWheel, advanceWheel)
    }

    setPaused(false)
  }

  const pauseWheel = () => {
    playerState.backgroundAudio.pause();
    playerState.foregroundAudio.pause();
    stopTimer();

    setPaused(true)
  }

  const advanceWheel = () => {
    const newPS = { ...playerState };

    if (newPS.wheel == null) return;

    newPS.curStpIdx += 1;

    if (newPS.curStpIdx >= newPS.wheel.steps.length) {
      newPS.wheel = null;
      newPS.foregroundAudio.pause();
      newPS.backgroundAudio.pause();
      if (settings.headsUpBeep) {
        const wheelComplete = new Audio(wheelCompleteMP3)
        wheelComplete.volume = settings.headsUpBeep.volume / 100;
        wheelComplete.play()
      }
      setTimerSecs(0)
      setPlayerState(newPS);
      return;
    }

    setTimerSecs(newPS.wheel.steps[newPS.curStpIdx].length / 1000)

    newPS.foregroundAudio.src = newPS.wheel.steps[newPS.curStpIdx].foreground_audio;
    newPS.foregroundAudio.load()
    if (newPS.wheel.steps[newPS.curStpIdx].override_song != null) {
      newPS.backgroundAudio.pause()
      newPS.backgroundAudio.src = newPS.wheel.steps[newPS.curStpIdx].override_song;
      newPS.backgroundAudio.load()
    }
    playWheel()

    setPaused(false)

    setUpMediaSession(newPS.wheel, newPS.wheel.steps[newPS.curStpIdx], playWheel, pauseWheel, advanceWheel)

    setPlayerState(newPS)
  }

  return <PlayerStateContext.Provider value={{ playerState, setActiveWheel, playWheel, pauseWheel, advanceWheel }}>
    {children}
  </PlayerStateContext.Provider>
}

const wheelMediaMetadata = (wheel: Wheel, currentStep: Step) => {
  return {
    title: currentStep.head,
    artist: wheel.title,
    album: wheel.title,
    artwork: [] // To be implemented with icons when those are implemented
  }
}

const setUpMediaSession = (wheel: Wheel, currentStep: Step, playHandler: () => void, pauseHandler: () => void, skipHandler: () => void) => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({ ...wheelMediaMetadata(wheel, currentStep), title: currentStep.head })

    navigator.mediaSession.setActionHandler("play", playHandler)
    navigator.mediaSession.setActionHandler("pause", playHandler)
    navigator.mediaSession.setActionHandler("stop", pauseHandler)
    navigator.mediaSession.setActionHandler("nexttrack", skipHandler)
  }
}
