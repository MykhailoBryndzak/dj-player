import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import  * as djPanelActions from '../actions/djPanelActions'

class DjPanel extends Component {
    render() {
        return (
            <div>
                <h1>Here dj panel</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        songs: state.songs,
        panel: state.panel
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Object.assign({}, djPanelActions), dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DjPanel);
