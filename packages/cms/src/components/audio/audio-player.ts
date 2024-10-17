import Player from "../../util/player"

export default class AudioPlayer implements Player {
    
    id: string
    audio : HTMLAudioElement
    onStart: VoidFunction
    onEnd: VoidFunction

    constructor({id, source, onStart, onEnd} ){
        this.id = id
        this.audio = new Audio(source)
        this.onStart = onStart
        this.onEnd = onEnd

        this.audio.onended = () => this.stop()
    }

    pause() {
        this.audio.pause()
    }

    isPaused() {
        return this.audio.paused
    }

    play() {
        this.onStart()
        this.audio.play()
    }
    
    stop() {
        this.audio.pause()
        this.onEnd()
    }



}