import React, { Component } from 'react'


class RenderIf extends Component {

    conditionalRendering(condition) {
        if (condition) {
            return this.props.children
        }
        else {
            return null
        }
    }

    render() {
        return (
            this.conditionalRendering(this.props.test)
        )
    }
}

export default RenderIf