import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as uploadSongsActions from '../actions/uploadSongsActions'

class UploadSongs extends Component {
    render() {
        return (
            <div>
                <h1>Upload Songs</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        songs: state.songs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Object.assign({}, uploadSongsActions), dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadSongs)