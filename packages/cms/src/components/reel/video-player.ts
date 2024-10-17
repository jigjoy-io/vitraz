import Player from '../../util/player'

export default class VideoPlayer implements Player {
    
    id: string
    video : HTMLVideoElement
    onStart: VoidFunction
    onEnd: VoidFunction

    constructor({id, video, onStart, onEnd} ){
        this.id = id
        this.video = video
        this.onStart = onStart
        this.onEnd = onEnd

    }


    play(): void { }
    
    stop(): void {
        this.video.pause()
        this.onEnd()
    }

    pause(): void {
        this.video.pause()
    }
    isPaused(): boolean {
        return this.video.paused
    }



}