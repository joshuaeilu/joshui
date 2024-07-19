import { Wheel } from "./Types";

export type SavedWheelsModel = {
  wheel_ids: number[]
}

export const SAVED_WHEELS_LS_KEY = "pw-saved"

export const getSavedWheels: () => SavedWheelsModel = () => {
  return JSON.parse((window.localStorage.getItem(SAVED_WHEELS_LS_KEY) ?? "{\"wheel_ids\": []}"));
}

const setSavedWheels = (savedWheels: SavedWheelsModel) => {
  window.localStorage.setItem(SAVED_WHEELS_LS_KEY, JSON.stringify(savedWheels))
}

export const addSavedWheel = (id: number) => {
  const savedWheels = getSavedWheels()
  savedWheels.wheel_ids.push(id)
  setSavedWheels(savedWheels)
}

export const removeSavedWheel = (id: number) => {
  const savedWheels = getSavedWheels()
  savedWheels.wheel_ids.forEach((element, index) => {
    if (element == id) savedWheels.wheel_ids.splice(index, 1)
  });
  setSavedWheels(savedWheels)
}

export const wheelSaved = (wheelId: number) => {
  const wheels = getSavedWheels()
  return wheels.wheel_ids.includes(wheelId)
}

export const toggleSaveWheel = (wheel: Wheel) => {
  const savedWheels = getSavedWheels()
  if (!savedWheels.wheel_ids.includes(wheel.id)) {
    addSavedWheel(wheel.id)
  } else {
    removeSavedWheel(wheel.id)
  }
}
