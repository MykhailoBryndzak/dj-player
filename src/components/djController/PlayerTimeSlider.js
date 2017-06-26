import React, {Component, PropTypes} from 'react'
import PlayerSlider from './PlayerSlider'
import '../../styles/app.scss'

class PlayerTimeSlider extends Component {
    humanizeTime(rawSeconds) {
        let hours = Math.floor(rawSeconds / 3600)
        let minutes = Math.floor((rawSeconds % 3600) / 60)
        let seconds = Math.floor((rawSeconds % 3600) % 60)

        return `${hours}:${this.stringifyTime(minutes)}:${this.stringifyTime(seconds)}`
    }

    stringifyTime(time) {
        return time < 10 ? `0${time}` : String(time)
    }

    render() {
        let {value, max, onChange, disabled} = this.props

        return (
            <div className="song-timeline">
                <PlayerSlider
                    value={value}
                    max={max}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div className="timers">
                    <div>{this.humanizeTime(value)}</div>
                    <div>{this.humanizeTime(max)}</div>
                </div>
            </div>
        )
    }
}

PlayerTimeSlider.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default PlayerTimeSlider