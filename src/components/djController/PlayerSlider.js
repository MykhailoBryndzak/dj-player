import React, {Component, PropTypes} from 'react'
import '../../styles/app.scss'

class PlayerSlider extends Component {
    onChange(e) {
        this.props.onChange(Number(e.target.value))
    }

    render() {
        let {value, max, disabled} = this.props

        return (
            <input
                className="slider"
                type="range"
                value={value}
                max={max}
                onChange={this.onChange.bind(this)}
                disabled={disabled}
            />
        )
    }
}

PlayerSlider.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default PlayerSlider