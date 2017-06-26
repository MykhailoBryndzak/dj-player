import React, {Component, PropTypes} from 'react'
import '../../styles/app.scss'
import Slider from './PlayerSlider'

class PlayerVolume extends Component {
    humanizeVolume(volume) {
        return `Volume: ${volume}%`
    }

    render() {
        let {value, max, onChange, disabled} = this.props

        return (
            <div className="song-volume">
                <Slider
                    value={value}
                    max={max}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div className="value">
                    {this.humanizeVolume(value)}
                </div>
            </div>
        )
    }
}

PlayerVolume.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default PlayerVolume