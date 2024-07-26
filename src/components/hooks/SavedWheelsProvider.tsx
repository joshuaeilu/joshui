import { createContext } from "react"
import useLocalStorageState from "use-local-storage-state"

export const defaultSavedWheels: number[] = []

export const SavedWheelsContext = createContext<{
  wheelIDs: number[]
  addSavedWheel: (wheelID: number) => void,
  removeSavedWheel: (wheelID: number) => void,
  wheelSaved: (wheelID: number) => boolean,
  toggleSaveWheel: (wheelID: number) => void
} | null>(null)

export const SavedWheelsProvider = ({ children }: { children: React.ReactNode }) => {
  const [wheelIDs, setWheelIDs] = useLocalStorageState("pw-saved", {
    defaultValue: defaultSavedWheels
  })
  
  const addSavedWheel = (wheelID: number) => {
    const newWheelIDs = wheelIDs
    newWheelIDs.push(wheelID)
    setWheelIDs(newWheelIDs)
  }

  const removeSavedWheel = (wheelID: number) => {
    const newWheelIDs = wheelIDs
    newWheelIDs.splice(newWheelIDs.indexOf(wheelID), 1)
    setWheelIDs(newWheelIDs)
  }

  const wheelSaved = (wheelID: number) => {
    return wheelIDs.includes(wheelID)
  }

  const toggleSaveWheel = (wheelID: number) => {
    if (!wheelSaved(wheelID)) {
      addSavedWheel(wheelID)
    } else {
      removeSavedWheel(wheelID)
    }
  }

  return <SavedWheelsContext.Provider value={{ wheelIDs, addSavedWheel, removeSavedWheel, wheelSaved, toggleSaveWheel }}>
    {children}
  </SavedWheelsContext.Provider>
}
