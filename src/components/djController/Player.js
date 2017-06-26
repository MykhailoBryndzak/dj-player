import React, {Component, PropTypes} from 'react'
import '../../styles/app.scss'
import PlayerBtn from './PlayerBtn'
import PlayerTimeSlider from './PlayerTimeSlider'
import PlayerVolume from './PlayerVolume'

let LOW_SPEED = 0.5
const NORMAL_SPEED = 1
const HIGH_SPEED = 2

class Player extends Component {
    constructor(props) {
        super(props)

        this.initSong(this.props.panel.index)
    }

    initSong(index, cb) {
        if (this.songs) {
            this.stop()
        }
        this.song = this.props.songs.data[index]
        this.props.setPosition(0)
        this.props.panel.playing && this.play()
        if (this.song) {
            this.setVolume(null, this.props.panel.volume)
            this.setSpeed(this.props.panel.speed)
            this.song.song.onended = () => {
                this.changeIndex(1)
            }
        }
        cb && cb(index)
    }

    getSongNumber(index, total) {
        return total ? `${index + 1} / ${total}` : '- / -'
    }

    getSongName() {
        return this.song ? this.song.name : <i>playlist is empty</i>
    }

    play(cb) {
        this.props.sliderTime()
        this.song.song.play()
        cb && cb()
    }

    pause(cb) {
        this.props.stopSliderTime()
        this.song.song.pause()
        cb && cb()
    }

    stop(cb) {
        this.props.stopSliderTime()
        this.song.song.pause()
        this.setPosition(null, 0)
        cb && cb()
    }

    setSpeed(speed, cb) {
        this.song.song.playbackRate = speed
        cb && cb(speed)
    }

    changeIndex(delta) {
        let {songs, panel, setSong} = this.props
        let currentIndex = panel.index
        let index = currentIndex + delta
        let maxIndex = songs.data.length - 1
        let newIndex = index < 0 ? maxIndex : index > maxIndex ? 0 : index

        this.initSong(newIndex)
        setSong(newIndex)
    }

    setPosition(cb, position) {
        this.song.song.currentTime = position

        cb && cb(position)
    }

    setVolume(cb, volume) {
        this.song.song.volume = this.props.commonVolume / 100 * volume / 100

        cb && cb(volume)
    }

    render() {
        let {
            songs, panel, playSong, pauseSong, stopSong, setSpeed,
            setPosition, setVolume
        } = this.props

        return (
            <div className="songs-player">
                <div className="player-display">
                    <div className="song-number">
                        {this.getSongNumber(panel.index, songs.data.length)}
                    </div>
                    <div className="song-name">
                        {this.getSongName()}
                    </div>
                </div>
                <PlayerTimeSlider
                    value={panel.position}
                    max={this.song ? this.song.song.duration : 0}
                    onChange={this.setPosition.bind(this, setPosition)}
                    disabled={!songs.data.length}
                />

                <div className="buttons">
                    <PlayerBtn
                        icon="play"
                        active={panel.x}
                        onClick={this.play.bind(this, playSong)}
                        disabled={!songs.data.length}
                    />
                    <PlayerBtn
                        icon="pause"
                        active={!panel.playing}
                        onClick={this.pause.bind(this, pauseSong)}
                        disabled={!songs.data.length}
                    />
                    <PlayerBtn
                        icon="stop"
                        onClick={this.stop.bind(this, stopSong)}
                        disabled={!songs.data.length}
                    />
                    <PlayerBtn
                        icon="backward"
                        active={panel.speed === LOW_SPEED}
                        onClick={this.setSpeed.bind(this,
                            panel.speed === LOW_SPEED ? NORMAL_SPEED : LOW_SPEED,
                            setSpeed)}
                        disabled={!songs.data.length}
                    />
                    <PlayerBtn
                        type="button"
                        className="btn btn-info"
                        icon="forward"
                        active={panel.speed === HIGH_SPEED}
                        onClick={this.setSpeed.bind(this,
                            panel.speed === HIGH_SPEED ? NORMAL_SPEED : HIGH_SPEED,
                            setSpeed)}
                        disabled={!songs.data.length}
                    />
                    <PlayerBtn
                        icon="step-backward"
                        onClick={this.changeIndex.bind(this, -1)}
                        disabled={songs.data.length < 2}
                    />
                    <PlayerBtn
                        icon="step-forward"
                        onClick={this.changeIndex.bind(this, 1)}
                        disabled={songs.data.length < 2}
                    />

                </div>
                <PlayerVolume

                    value={panel.volume}
                    max={100}
                    onChange={this.setVolume.bind(this, setVolume)}
                    disabled={!songs.data.length}
                />
            </div>
        )
    }
}

Player.propTypes = {
    songs: PropTypes.object.isRequired,
    panel: PropTypes.object.isRequired,
    playSong: PropTypes.func.isRequired,
    pauseSong: PropTypes.func.isRequired,
    stopSong: PropTypes.func.isRequired,
    setSpeed: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    setSong: PropTypes.func.isRequired,
    commonVolume: PropTypes.number.isRequired,
    sliderTime: PropTypes.func.isRequired,
    stopSliderTime: PropTypes.func.isRequired
}

export default Player

