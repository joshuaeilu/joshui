export type User = {
  id: number
  username: string
  wheel_set: Wheel[]
}

export type Wheel = {
  id: number
  title: string
  description: string
  steps: Step[]
  background_audio: WheelAudio[]
  // milliseconds
  wheel_time: number
  icon: string
}

export type ResolvedWheel = {
  id: number
  title: string
  description: string
  steps: ResolvedStep[]
  background_audio: ResolvedWheelAudio[]
  wheel_time: number
  icon: string
}

export type Step = {
  id: number
  wheel: number
  head: string
  body: string
  override_song: string
  foreground_audio: string
  // milliseconds
  length: number
  wheel_index: number
}

export type ResolvedStep = {
  id: number
  wheel: number
  head: string
  body: string
  override_song: Blob | null
  foreground_audio: Blob | null
  length: number
  wheel_index: number
}

export type WheelAudio = {
  id: number
  wheel: Wheel
  audio_url: string
}

export type ResolvedWheelAudio = {
  id: number
  wheel: Wheel
  audio: Blob | null
}
