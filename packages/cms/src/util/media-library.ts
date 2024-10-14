import Player from './player'

export default class MediaLibrary {

    private static instance: MediaLibrary | null = null
    private mediaLibrary: Player [] = []
    private activePlayer: Player

    private constructor() {}

    static getInstance() {
        if(!this.instance){
            this.instance =  new MediaLibrary()
        }
        return this.instance
    }

    public addPlayer(player: Player){
        this.mediaLibrary.push(player)
    }

    public removePlayer(media: Player){
        this.mediaLibrary = this.mediaLibrary.filter(player => player.id != player.id)
    }

    public stopAll(){
        this.mediaLibrary.map(player => (player.id != this.activePlayer.id) && player.stop())
    }

    public play (player: Player) {
        if(player.id != this.activePlayer?.id){
            this.activePlayer = player
            this.stopAll()
            this.activePlayer.play()
        }else{
            this.activePlayer.isPaused() ? this.activePlayer.play() : this.activePlayer.pause()
        }

        
    }

}