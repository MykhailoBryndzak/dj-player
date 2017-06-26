import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as uploadSongsActions from '../actions/uploadSongsActions'
import '../styles/app.scss'
import UploadFile from '../components/uploadSongs/UploadFile'

class UploadSongs extends Component {
    openDJController() {
        this.context.router.push('/dj-controller')
    }

    songsReady() {
        let {left, right} = this.props.songs

        return !left.loading && !right.loading &&
            (left.data.length || right.data.length)
    }

    render() {
        let {songs, actions} = this.props

        return (
            <div className="upload-page">
                <div className="dropzones">
                    <UploadFile
                        title="Left Playlist"
                        songs={songs.left}
                        onLoadStart={actions.loadSongsStart.bind(null, 'left')}
                        onLoadEnd={actions.loadSongsEnd.bind(null, 'left')}
                        onRemove={actions.removeSong.bind(null, 'left')}
                    />
                    <UploadFile
                        title="Right Playlist"
                        songs={songs.right}
                        onLoadStart={actions.loadSongsStart.bind(null, 'right')}
                        onLoadEnd={actions.loadSongsEnd.bind(null, 'right')}
                        onRemove={actions.removeSong.bind(null, 'right')}
                    />
                </div>
                <div className="controls">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.openDJController.bind(this)}
                        disabled={!this.songsReady()}
                    >
                        Go to DJ Panel
                    </button>
                </div>
            </div>
        )
    }
}
UploadSongs.propTypes = {
    songs: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}

UploadSongs.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        songs: state.songs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, uploadSongsActions), dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadSongs)