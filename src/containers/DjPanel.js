import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import  * as djPanelActions from '../actions/djPanelActions'

import '../styles/app.scss'
import Player from '../components/djController/Player'
import PlayerBtn from '../components/djController/PlayerBtn'
import PlayerVolume from '../components/djController/PlayerVolume'

class DjPanel extends Component {
    componentWillUnmount() {
        let {resetDjPanel} = this.props.actions
        let {left, right} = this.getSongs()

        this.stopSliderTime ('left')
        if (left.song) {
            left.song.pause()
            left.song.currentTime = 0
        }

        this.stopSliderTime ('right')
        if (right.song) {
            right.song.pause()
            right.song.currentTime = 0
        }

        resetDjPanel()
    }

    moveToUploadSongs() {
        this.context.router.push('/upload')
    }

    sliderTime(player) {
        this[`${player}interval`] = setInterval(() => {
            let {songs, panel, actions} = this.props

            actions.setPosition(player,
                songs[player].data[panel[player].index].song.currentTime)
        }, 100)
    }

    stopSliderTime(player) {
        clearInterval(this[`${player}interval`])
    }

    getSongs() {
        let {songs, panel} = this.props
        let leftSong = songs.left.data[panel.left.index]
        let rightSong = songs.right.data[panel.right.index]

        return {
            left: {
                song: leftSong ? leftSong.song : null,
                panel: panel.left,
            },
            right: {
                song: rightSong ? rightSong.song : null,
                panel: panel.right,
            },
        }
    }

    play() {
        let {playSong} = this.props.actions
        let {left, right} = this.getSongs()

        if (left.song && !left.panel.playing) {
            this.sliderTime('left')
            left.song.play()
            playSong('left')
        }

        if (right.song && !right.panel.playing) {
            this.sliderTime('right')
            right.song.play()
            playSong('right')
        }
    }

    pause() {
        let {pauseSong} = this.props.actions
        let {left, right} = this.getSongs()

        if (left.song && left.panel.playing) {
            this.stopSliderTime ('left')
            left.song.pause()
            pauseSong('left')
        }

        if (right.song && right.panel.playing) {
            this.stopSliderTime ('right')
            right.song.pause()
            pauseSong('right')
        }
    }

    setVolume(volume) {
        let {songs, panel, actions} = this.props
        let leftSong = songs.left.data[panel.left.index]
        let rightSong = songs.right.data[panel.right.index]

        leftSong && (leftSong.song.volume = volume / 100 * panel.left.volume / 100)
        rightSong && (rightSong.song.volume = volume / 100 * panel.right.volume / 100)

        actions.setVolumeCommon(volume)
    }

    render() {
        let {songs, panel} = this.props
        let actions = this.props.actions

        return (
            <div className="dj-panel-page">
                <div className="players">
                    <div className="player">
                        <Player
                            songs={songs.left}
                            panel={panel.left}
                            playSong={actions.playSong.bind(null, 'left')}
                            pauseSong={actions.pauseSong.bind(null, 'left')}
                            stopSong={actions.stopSong.bind(null, 'left')}
                            setSpeed={actions.setSpeed.bind(null, 'left')}
                            setSong={actions.setSong.bind(null, 'left')}
                            setPosition={actions.setPosition.bind(null, 'left')}
                            setVolume={actions.setVolume.bind(null, 'left')}
                            commonVolume={panel.common.volume}
                            sliderTime={this.sliderTime.bind(this, 'left')}
                            stopSliderTime ={this.stopSliderTime .bind(this, 'left')}
                        />
                    </div>
                    <div className="player">
                        <Player
                            songs={songs.right}
                            panel={panel.right}
                            playSong={actions.playSong.bind(null, 'right')}
                            pauseSong={actions.pauseSong.bind(null, 'right')}
                            stopSong={actions.stopSong.bind(null, 'right')}
                            setSpeed={actions.setSpeed.bind(null, 'right')}
                            setSong={actions.setSong.bind(null, 'right')}
                            setPosition={actions.setPosition.bind(null, 'right')}
                            setVolume={actions.setVolume.bind(null, 'right')}
                            commonVolume={panel.common.volume}
                            sliderTime={this.sliderTime.bind(this, 'right')}
                            stopSliderTime ={this.stopSliderTime .bind(this, 'right')}
                        />
                    </div>
                </div>
                <div className="common-controls">
                    <PlayerBtn
                        icon="play"
                        onClick={this.play.bind(this)}
                    />
                    <PlayerBtn
                        icon="pause"
                        onClick={this.pause.bind(this)}
                    />
                    <PlayerVolume
                        value={panel.common.volume}
                        max={100}
                        onChange={this.setVolume.bind(this)}
                    />
                </div>
                <div className="controls">
                    <button
                        className="btn btn-info"
                        onClick={this.moveToUploadSongs.bind(this)}
                    >
                        Upload songs
                    </button>
                </div>
            </div>
        )
    }
}

DjPanel.propTypes = {
    songs: PropTypes.object.isRequired,
    panel: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

DjPanel.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        songs: state.songs,
        panel: state.panel
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, djPanelActions), dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DjPanel)
