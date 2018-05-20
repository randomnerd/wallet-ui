import React, {Component} from 'react';
import {Table,Button,Icon,Label,Popup} from 'semantic-ui-react';
import {compose} from "recompose";
import {inject, observer} from "mobx-react/index";
import Clipboard from 'react-clipboard.js';

class ACL extends Component {
    state = {
        pubkey: 'Loading...',
        privkey: 'Loading...'
    };

    async getKeys() {
        const {pubkey, privkey} = await this.props.root.getACL({pubkey: this.props.acl.pubkey});
        this.setState({pubkey, privkey});
    }

    renderKeysPopup() {
        const {pubkey, privkey} = this.state;
        const triggerBtn = (
            <Button size="mini">
                <Icon name="key"/> Show
            </Button>
        );
        return (
            <Popup
                flowing
                trigger={triggerBtn}
                on="click"
                onOpen={() => this.getKeys()}
                onClose={() => this.setState({pubkey: 'Loading...', privkey: 'Loading...'})}
            >
                <span className="monospace">
                    Public:&nbsp; {pubkey}&nbsp;
                    <Clipboard data-clipboard-text={pubkey} className="ui mini icon button">
                        <Icon name="copy"/>
                    </Clipboard><br/>
                    Private: {privkey}&nbsp;
                    <Clipboard data-clipboard-text={privkey} className="ui mini icon button">
                        <Icon name="copy"/>
                    </Clipboard>
                </span><br/>
            </Popup>
        );
    }

    async delete() {
        await this.props.root.delACL({pubkey: this.props.acl.pubkey});
        this.props.root.fetchACLs();

    }

    render() {
        const acl = this.props.acl;
        const {router} = this.props.root;
        return (
            <Table.Row>
                <Table.Cell>{acl.name}</Table.Cell>
                <Table.Cell>{this.renderKeysPopup()}</Table.Cell>
                <Table.Cell>{acl.methods.map(m => <Label key={m}>{m}</Label>)}</Table.Cell>
                <Table.Cell textAlign="right">
                    <Button.Group size="mini">
                        <Button onClick={() => router.push(`/acl/edit/${acl.pubkey}`)}>
                            <Icon name="edit"/> Edit
                        </Button>
                        <Button onClick={() => this.delete()}>
                            <Icon name="delete"/> Delete
                        </Button>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        );
    }
}

class ACLList extends Component {
    async componentDidMount() {
        this.props.root.fetchACLs();
    }

    render() {
        const {acls} = this.props.root;
        const {router} = this.props.root;
        return (
            <Table striped basic compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>NAME</Table.HeaderCell>
                        <Table.HeaderCell>KEYS</Table.HeaderCell>
                        <Table.HeaderCell>METHODS</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">
                            <Button onClick={() => router.push(`/acl/new`)}>
                                <Icon name="plus"/> Add ACL
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {acls.map((acl) => <ACL root={this.props.root} key={acl.id} acl={acl}/>)}
                </Table.Body>
            </Table>
        );
    }
}

export default compose(
    inject('root'),
    observer
)(ACLList);
