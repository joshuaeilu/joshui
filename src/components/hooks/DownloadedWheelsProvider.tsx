import { createContext, useContext } from "react"
import useLocalStorageState from "use-local-storage-state"

export const defaultDownloadedWheels: number[] = []

const DownloadedWheelsContext = createContext<{
  wheelIDs: number[]
  addDownloadedWheel: (wheelID: number) => void,
  removeDownloadedWheel: (wheelID: number) => void,
  wheelDownloaded: (wheelID: number) => boolean,
  toggleDownloadedWheel: (wheelID: number) => void
} | null>(null)

export const DownloadedWheelsProvider = ({ children }: { children: React.ReactNode }) => {
  const [wheelIDs, setWheelIDs] = useLocalStorageState("pw-downloaded", {
    defaultValue: defaultDownloadedWheels
  })
  
  const addDownloadedWheel = (wheelID: number) => {
    const newWheelIDs = wheelIDs
    newWheelIDs.push(wheelID)
    setWheelIDs(newWheelIDs)
  }

  const removeDownloadedWheel = (wheelID: number) => {
    const newWheelIDs = wheelIDs
    newWheelIDs.splice(newWheelIDs.indexOf(wheelID), 1)
    setWheelIDs(newWheelIDs)
  }

  const wheelDownloaded = (wheelID: number) => {
    return wheelIDs.includes(wheelID)
  }

  const toggleDownloadedWheel = (wheelID: number) => {
    if (!wheelDownloaded(wheelID)) {
      addDownloadedWheel(wheelID)
    } else {
      removeDownloadedWheel(wheelID)
    }
  }

  return <DownloadedWheelsContext.Provider value={{ wheelIDs, addDownloadedWheel: addDownloadedWheel, removeDownloadedWheel: removeDownloadedWheel, wheelDownloaded: wheelDownloaded, toggleDownloadedWheel: toggleDownloadedWheel }}>
    {children}
  </DownloadedWheelsContext.Provider>
}

export const useDownloadedWheels = () => {
  return useContext(DownloadedWheelsContext)
}
