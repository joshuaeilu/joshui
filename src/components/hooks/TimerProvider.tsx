import React from "react"
import { createContext } from "react"

export const defaultTimerContext = {
  timerSeconds: 0
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
  interval: () => any
} | null>(null)

export function TimerProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [timer, setTimer] = React.useState(defaultTimerContext);
  let i = setInterval(() => {}, 100000000)
  const [internalInterval, setInternalInterval] = React.useState<typeof i | null>(null);

  const interval = () => {
    if (internalInterval != null)
      clearInterval(internalInterval);
    setInternalInterval(setInterval(() => {
      setTimer((last) => {
        if(last.timerSeconds <= 0) {
          return last;
        }
        return { timerSeconds: last.timerSeconds - 1 }
      });
    }, 1000));
  };

  return (
    <TimerContext.Provider value={{ timer, setTimer, interval}}>
      {children}
    </TimerContext.Provider>
  )
}
