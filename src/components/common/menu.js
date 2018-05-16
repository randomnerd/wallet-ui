import React, {Component} from 'react';
import {Menu, Container, Icon} from 'semantic-ui-react';
import Link from './link';

class TopMenu extends Component {
    render() {
        return (
            <Menu fixed='top' inverted>
                <Container>
                    <Link to="/" activeClassName="active" className="menu item">
                        <Icon name="clone"/> Wallets
                    </Link>
                    <Link to="/ops" activeClassName="active" className="menu item">
                        <Icon name="exchange"/> Operations
                    </Link>
                    <Link to="/acl" activeClassName="active" className="menu item">
                        <Icon name="shield"/> ACLs
                    </Link>
                    <Menu.Menu position="right">
                        <Link to="/login" activeClassName="active" className="menu item">
                            <Icon name="key"/> Auth
                        </Link>
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

export default TopMenu
