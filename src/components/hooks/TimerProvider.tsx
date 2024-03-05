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
} | null>(null)

export function TimerProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [timer, setTimer] = React.useState(defaultTimerContext);

  React.useEffect(() => {
    setInterval(() => {
      setTimer({timerSeconds: timer.timerSeconds - 1});
    }, 1000)
  })

  return (
    <TimerContext.Provider value={{ timer, setTimer }}>
      {children}
    </TimerContext.Provider>
  )
}
