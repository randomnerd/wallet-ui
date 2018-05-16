import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container } from 'semantic-ui-react';
import TopMenu from './common/menu';
import PopupMsg from './common/popup_msg';
import {compose} from "recompose";
import MobxDevtools from 'mobx-react-devtools';


class Layout extends Component {
    render() {
        let prod = process.env.NODE_ENV === 'production';
        return (
            <div className={`${this.props.router.match.name} app-wrapper`}>
                <TopMenu/>
                <Container>
                    <PopupMsg/>
                    {this.props.router.match.render}
                </Container>
                {!prod && <MobxDevtools position={{ bottom: 0, right: 100 }} />}
            </div>
        );
    }
}

export default compose(
    inject('router'),
    observer,
)(Layout);
