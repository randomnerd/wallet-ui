import React, {Component} from 'react';
import {Segment,Form} from 'semantic-ui-react';
import {compose} from "recompose";
import {inject, observer} from "mobx-react/index";

class WalletFilter extends Component {
    state = {
        uid: '',
        symbol: ''
    };

    handleChange(e, {name, value}) {
        this.setState({[name]: value});
    }
    componentDidMount() {
        const {router} = this.props.root;
        this.setState(router.values);
    }
    applyFilter() {
        const {uid, symbol} = this.state;
        const filter = {};
        if (uid) filter.uid = uid;
        if (symbol) filter.symbol = symbol;
        this.props.root.fetchWallets(filter);
    }
    render() {
        return (
            <Segment basic compact>
                <Form>
                    <Form.Group inline>
                        <Form.Input
                            name="uid"
                            type="number"
                            label="User ID"
                            placeholder="User ID"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.uid}
                        />
                        <Form.Input
                            name="symbol"
                            label="Symbol"
                            placeholder="Symbol"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.symbol}
                        />
                        <Form.Button onClick={() => this.applyFilter()}>Apply</Form.Button>
                    </Form.Group>
                </Form>
            </Segment>
        );
    }
}

export default compose(
    inject('root'),
    observer
)(WalletFilter);
