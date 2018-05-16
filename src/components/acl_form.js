import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import {inject, observer} from "mobx-react/index";
import {compose} from "recompose";

class ACLForm extends Component {
    methods = [
        { text: 'All', value: '*' },
        { text: 'Operation PUT', value: 'put' },
        { text: 'Operation TAKE', value: 'take' },
        { text: 'Batch operation', value: 'batch' },
        { text: 'Add ACLs', value: 'addACL' },
        { text: 'Delete ACLs', value: 'delACL' },
        { text: 'Edit ACLs', value: 'editACL' },
        { text: 'List ACLs', value: 'getACLs' },
        { text: 'View ACL keys', value: 'getACL' },
        { text: 'Withdraw funds', value: 'withdraw' },
        { text: 'Get wallet', value: 'getWallet' },
        { text: 'List wallets', value: 'getWallets' },
        { text: 'Generate new address', value: 'newAddress' },
        { text: 'List operations', value: 'getOperations' }
    ];
    state = {
        name: '',
        pubkey: '',
        methods: []
    };
    handleChange(e, {name, value}) {
        this.setState({[name]: value});
    }
    async componentDidMount() {
        if (this.props.action === 'new') return;
        const {pubkey, name, methods} = await this.props.root.getACL({pubkey: this.props.router.values.pubkey});
        this.setState({pubkey, name, methods});
    }
    async save() {
        if (this.props.action === 'new') {
            const keys = await this.props.root.addACL({
                name: this.state.name,
                methods: this.state.methods
            });
            console.log(keys);
        } else {
            const {pubkey, name, methods} = this.state;
            await this.props.root.editACL({pubkey, name, methods});
        }
        this.props.router.go(-1);
    }
    render() {
        const {name, methods} = this.state;
        return (
            <Form size='massive'>
                <h2>
                    {
                        this.props.action === 'new' ?
                            `New ACL` :
                            `Edit ACL "${name}"`
                    }
                </h2>
                <Form.Input
                    fluid
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange.bind(this)}
                    placeholder={`ACL name`}
                />
                <Form.Dropdown
                    multiple
                    selection
                    name="methods"
                    options={this.methods}
                    placeholder="Select allowed methods"
                    onChange={this.handleChange.bind(this)}
                    value={methods}
                />
                <Form.Button color='blue' size="massive" fluid onClick={() => this.save()}>Save</Form.Button>
                <Form.Button color='grey' size="massive" fluid onClick={() => this.props.router.go(-1)}>Back</Form.Button>
            </Form>
        );
    }
}

export default compose(
    inject('router', 'root'),
    observer
)(ACLForm);
