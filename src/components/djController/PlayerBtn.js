import React, { Component, PropTypes } from 'react'
import '../../styles/app.scss'

class PlayerBtn extends Component {



    render() {
        let { icon, onClick, disabled } = this.props

        return (
            <button
                onClick={onClick}
                disabled={disabled}
            >
                <i className={`fa fa-${icon}`} />
            </button>
        )
    }
}

PlayerBtn.propTypes = {
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default PlayerBtn