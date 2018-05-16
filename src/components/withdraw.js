import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import {inject, observer} from "mobx-react/index";
import {compose} from "recompose";

class Withdraw extends Component {
    state = {
        addr: '',
        value: ''
    };
    handleChange(e, {name, value}) {
        this.setState({[name]: value});
    }
    do() {
        const { symbol, uid } = this.props.router.values;
        this.props.root.withdraw(symbol, uid, parseFloat(this.state.value), this.state.addr);
    }
    render() {
        const {values} = this.props.router;
        return (
            <Form size='massive'>
                <h2>Withdrawal for wallet {values.symbol.toUpperCase()}#{values.uid}</h2>
                <Form.Input
                    fluid
                    name='value'
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    placeholder={`Amount to withdraw`}
                    autoComplete="off"
                />
                <Form.Input
                    fluid
                    name='addr'
                    value={this.state.addr}
                    onChange={this.handleChange.bind(this)}
                    placeholder={`Destination address`}
                />
                <Form.Button color='blue' size="massive" fluid onClick={this.do.bind(this)}>Withdraw</Form.Button>
                <Form.Button color='grey' size="massive" fluid onClick={() => this.props.router.go(-1)}>Back</Form.Button>
            </Form>
        );
    }
}

export default compose(
    inject('router', 'root'),
    observer
)(Withdraw);
