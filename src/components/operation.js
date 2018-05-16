import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import {inject, observer} from "mobx-react/index";
import {compose} from "recompose";

class Operation extends Component {
    state = {
        value: ''
    };
    handleChange(e, {name, value}) {
        this.setState({[name]: value});
    }
    do() {
        const {kind, symbol, uid } = this.props.router.values;
        this.props.root.walletOp(kind, symbol, uid, parseFloat(this.state.value));
    }
    render() {
        const {values} = this.props.router;
        return (
            <Form size='massive'>
                <h2>Operation {values.kind.toUpperCase()} for wallet {values.symbol.toUpperCase()}#{values.uid}</h2>
                <Form.Input
                    fluid
                    name='value'
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    placeholder={`Amount to ${values.kind.toUpperCase()}`}
                    autoComplete="off"
                />
                <Form.Button color='blue' size="massive" fluid onClick={this.do.bind(this)}>{values.kind.toUpperCase()}</Form.Button>
                <Form.Button color='grey' size="massive" fluid onClick={() => this.props.router.go(-1)}>Back</Form.Button>
            </Form>
        );
    }
}

export default compose(
    inject('router', 'root'),
    observer
)(Operation);
