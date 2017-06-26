/**
 * Created by mykhailo on 6/25/17.
 */
import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import {parallel} from 'async'
import '../../styles/app.scss'

class UploadFile extends Component {
    constructor() {
        super()

        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(e) {
        e.preventDefault()

        let {songs, onLoadStart, onLoadEnd} = this.props
        let files = e.dataTransfer.files
        let existingNames = songs.data.map(song => song.name)
        let newSongs = []

        onLoadStart()

        for (let file of files) {
            if (file.type === 'audio/mp3' && !_.includes(existingNames, file.name)) {
                newSongs.push(file)
            }
        }

        parallel(newSongs.map(song => {
                return callback => {
                    let freader = new FileReader()
                    freader.onload = e => {
                        callback(null, {
                            name: song.name,
                            song: new Audio(e.target.result),
                        })
                    }
                    freader.readAsDataURL(song)
                }
            }),
            (err, results) => {
                onLoadEnd(results)
            })
    }

    onDragOver(e) {
        e.preventDefault()
    }

    onDragEnd(e) {
        e.dataTransfer.clearData()
    }

    render() {
        let {title, songs, onRemove} = this.props

        return (
            <div
                className="songs-loader"
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                onDragEnd={this.onDragEnd}
            >
                <div className="title">
                    {title}
                </div>
                {
                    !songs.data.length ?
                        <div className="hint">
                            <h3>drag and drop file here</h3>
                            <i className={`fa fa-file-audio-o`} />
                        </div>
                        : null
                }
                {
                    songs.data.map((song, index) => {
                        return (
                            <div
                                key={index}
                                className="song"
                                onClick={onRemove.bind(null, index)}
                            >
                                {`${index + 1}. ${song.name}`}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

UploadFile.propTypes = {
    title: PropTypes.string.isRequired,
    songs: PropTypes.object.isRequired,
    onLoadStart: PropTypes.func.isRequired,
    onLoadEnd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default UploadFile