import React from "react"
import { createContext } from "react"

export const defaultTimerContext = {
  timerSeconds: 0,
}

export const TimerContext = createContext<{
  timer: {
    timerSeconds: number;
  }
  setTimer: React.Dispatch<
    React.SetStateAction<{
      timerSeconds: number
    }>
  >
  stopTimer: () => any
  startTimer: () => any
  setTimerSecs: (secs: number) => any
} | null>(null)

export function TimerProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [timer, setTimer] = React.useState(defaultTimerContext);
  let i = setInterval(() => {}, 100000000)
  const [internalInterval, setInternalInterval] = React.useState<typeof i | null>(null);

  const stopTimer = () => {
    if(internalInterval != null)
      clearInterval(internalInterval);
  }

  const startTimer = () => {
    stopTimer();
    setInternalInterval(setInterval(() => {
      setTimer((last) => {
        if(last.timerSeconds <= 0) {
          return last;
        }
        return { timerSeconds: last.timerSeconds - 1 }
      });
    }, 1000));
  }

  const setTimerSecs = (secs: number) => {
    setTimer({timerSeconds: secs})
  };

  return (
    <TimerContext.Provider value={{ timer, setTimer, stopTimer, startTimer, setTimerSecs}}>
      {children}
    </TimerContext.Provider>
  )
}
