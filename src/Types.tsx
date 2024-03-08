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
}

export type Step = {
    id: number
    wheel: number
    head: string
    body: string
    override_song: string
    foreground_audio: string
    length: number
    wheel_index: number
}

export type WheelAudio = {
    id: number
    wheel: Wheel
    audio_url: string
}

export type SavedWheels = {
    wheel_ids: number[]
}
