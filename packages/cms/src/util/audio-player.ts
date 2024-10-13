class AudioPlayer {
    private static instance: AudioPlayer | null = null
    private player: HTMLAudioElement = new Audio()

    private subscribers: any [] = []
    private constructor() {}

    public static getInstance(): AudioPlayer {
        if (!this.instance) {
            this.instance = new AudioPlayer()
        }
        return this.instance
    }

    public play(elementId: string, source: string): void {

        this.subscribers.map(callback => callback())
        this.player.src = source
        this.player.play()
        
    }

    public onStart(callback): void {
        this.player.onplay = function() {
            callback()
        }
    }

    public onEnd(callback): void {
        this.subscribers.push(callback)

    }

    public isPlaying(source){
        return this.player == source
    }


}

export default AudioPlayer