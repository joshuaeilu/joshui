export type User = {
    id: number
    wheel_set: Wheel[]
    username: string
}

export type Wheel = {
    id: number
    title: string
    description: string
    owner: number
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
    Wheel: Wheel
    audio_file: string
}
