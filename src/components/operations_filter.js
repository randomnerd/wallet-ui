import React, {Component} from 'react';
import {Segment,Form} from 'semantic-ui-react';
import {compose} from "recompose";
import {inject, observer} from "mobx-react/index";

class OperationFilter extends Component {
    state = {
        uid: '',
        wid: '',
        symbol: '',
        kind: ''
    };

    handleChange(e, {name, value}) {
        this.setState({[name]: value});
    }
    componentDidMount() {
        const {router} = this.props.root;
        this.setState(router.values);
    }
    applyFilter() {
        const {uid, wid, symbol, kind} = this.state;
        const filter = {};
        if (uid) filter.uid = uid;
        if (wid) filter.wid = wid;
        if (kind) filter.kind = kind;
        if (symbol) filter.symbol = symbol;
        this.props.root.fetchOperations(filter);
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
                                name="wid"
                                type="number"
                                label="Wallet ID"
                                placeholder="Wallet ID"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.wid}
                            />
                            <Form.Input
                                name="symbol"
                                label="Symbol"
                                placeholder="Symbol"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.symbol}
                            />
                            <Form.Dropdown
                                selection
                                name="kind"
                                label="Kind"
                                options={[
                                    {text: 'any', value: ''},
                                    {text: 'TAKE', value: 'take'},
                                    {text: 'PUT', value: 'put'}
                                ]}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.kind}
                                placeholder="Kind"
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
)(OperationFilter);
