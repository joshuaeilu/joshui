import { useIonToast } from "@ionic/react"
import { Storage } from "@ionic/storage"
import { createContext, useContext, useEffect, useState } from "react"
import { ResolvedStep, ResolvedWheel, ResolvedWheelAudio, Wheel } from "../../Types"
import { API_URL } from "../../App"

const useStorage = (): Storage | null => {
  const [storage, setStorage] = useState<Storage | null>(null)

  const initStorage = async () => {
    const store = new Storage()
    await store.create()

    setStorage(store)
  }

  useEffect(() => {
    initStorage()
  }, [])

  return storage
}

export const defaultDownloadedWheels: number[] = []

const DownloadedWheelsContext = createContext<{
  // needed for upstream components to listen to events
  reactiveValue: number,
  addWheel: (wheelID: number) => Promise<void>,
  removeWheel: (wheelID: number) => Promise<void>,
  isDownloaded: (wheelID: number) => Promise<boolean>,
  getWheel: (wheelID: number) => Promise<Wheel>,
  retrieveWheels: () => Promise<Wheel[]>
} | null>(null)

export const DownloadedWheelsProvider = ({ children }: { children: React.ReactNode }) => {
  const [reactiveValueHack, setReactiveValueHack] = useState(0) 
  const storage = useStorage()
  if (!storage) return;

  const addWheel = async (wheelID: number) => {
    const resolvedWheel = await resolveWheelURLs(wheelID)
    await storage.set(`pw-downloaded-${wheelID}`, resolvedWheel);
    setReactiveValueHack(reactiveValueHack+1)
    return Promise.resolve()
  }

  const removeWheel = async (wheelID: number) => {
    await storage.remove(`pw-downloaded-${wheelID}`)
    setReactiveValueHack(reactiveValueHack-1)
    return Promise.resolve()
  }

  const isDownloaded = async (wheelID: number) => {
    return (await storage.get(`pw-downloaded-${wheelID}`)) != null
  }

  const getWheel = async (wheelID: number) => {
    return resolvedWheelToWheel(await storage.get(`pw-downloaded-${wheelID}`))
  }

  const retrieveWheels = async () => {
    return await storage.keys().then(keys => {
      return Promise.all(keys.map(async key => resolvedWheelToWheel(await storage.get(key))))
    })
  }

  return <DownloadedWheelsContext.Provider value={{
    reactiveValue: reactiveValueHack,
    addWheel: addWheel,
    removeWheel: removeWheel,
    isDownloaded: isDownloaded,
    getWheel: getWheel,
    retrieveWheels: retrieveWheels
  }}>
    {children}
  </DownloadedWheelsContext.Provider>
}

export const useDownloadedWheels = () => {
  return useContext(DownloadedWheelsContext)
}

export async function resolvedWheelToWheel(resolvedWheel: ResolvedWheel): Promise<Wheel> {
  const storage = new Storage()
  await storage.create()
  const wheelFromStorage = await storage.get(`pw-downloaded-${resolvedWheel.id}`)

  const wheel: Wheel = {
    ...wheelFromStorage,
    steps: resolvedWheel.steps.map((step) => ({
      ...step,
      override_song: step.override_song?.type.includes("audio") ? URL.createObjectURL(step.override_song) : null,
      foreground_audio: step.foreground_audio?.type.includes("audio") ? URL.createObjectURL(step.foreground_audio) : null
    })),
    background_audio: resolvedWheel.background_audio.map((audio) => ({
      ...audio,
      audio_url: audio.audio ? URL.createObjectURL(audio.audio) : null
    }))
  }

  return wheel
}

// Utility that requests the contents of the URLs in a wheel and returns a new wheel where the keys that the URLs were stored at now have blobs.
export async function resolveWheelURLs(wheelID: number): Promise<ResolvedWheel> {
  const req = await fetch(`${API_URL}/wheels/${wheelID}/`)
  if (!req.ok) return Promise.reject()
  const wheel: Wheel = await req.json();

  let resolvedWheel: ResolvedWheel = {
    ...wheel,
    background_audio: await Promise.all(wheel.background_audio.map(async (audio) => {
      const audioBlob = await fetch(audio.audio_url);

      const resolvedAudio: ResolvedWheelAudio = {
        audio: await audioBlob.blob(),
        id: audio.id,
        wheel
      }

      return resolvedAudio
    })),
    steps: await Promise.all(wheel.steps.map(async (step) => {
      const foregroundAudio = await fetch(step.foreground_audio);
      const overrideAudio = await fetch(step.override_song);

      const resolvedStep: ResolvedStep = {
        foreground_audio: await foregroundAudio.blob(),
        override_song: await overrideAudio.blob(),
        body: step.body,
        head: step.head,
        id: step.id,
        wheel: step.wheel,
        length: step.length,
        wheel_index: step.wheel_index
      };

      return resolvedStep
    }))
  }

  return resolvedWheel
}
