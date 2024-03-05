export type Wheel = {
    id: number
    title: string
    description: string
    owner: number
    steps: Step[]
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
    wheel: number
    audio_file: string
}