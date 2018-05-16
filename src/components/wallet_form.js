import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import {inject, observer} from "mobx-react/index";
import {compose} from "recompose";

class WalletForm extends Component {
    state = {
        uid: '',
        symbol: '',
    };
    handleChange(e, {name, value}) {
        this.setState({[name]: value});
    }
    async save() {
        const {uid, symbol} = this.state;
        const wallet = await this.props.root.getWallet({uid, symbol});
        console.log(wallet);
        this.props.router.go(-1);
    }
    render() {
        const {uid, symbol} = this.state;
        return (
            <Form size='massive'>
                <h2>
                    New wallet
                </h2>
                <Form.Input
                    fluid
                    name='uid'
                    type='number'
                    value={uid}
                    onChange={this.handleChange.bind(this)}
                    placeholder={`User ID`}
                />
                <Form.Input
                    fluid
                    name='symbol'
                    value={symbol}
                    onChange={this.handleChange.bind(this)}
                    placeholder={`Currency symbol`}
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
)(WalletForm);
