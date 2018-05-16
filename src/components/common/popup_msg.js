import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class PopupMsg extends Component {
    render() {
        return (
            <Message>...</Message>
        );
    }
}

class PopupOverlay extends Component {
    render() {
        return (
            <div id="popup-overlay">

            </div>
        );
    }
}

export default PopupOverlay;
