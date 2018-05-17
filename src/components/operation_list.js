import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {compose} from "recompose";
import {inject, observer} from "mobx-react/index";
import OperationFilter from './operations_filter';
import moment from 'moment';

class OperationRow extends Component {
    render() {
        const {op} = this.props;
        return (
            <Table.Row>
                <Table.Cell textAlign="right">{op.uid}</Table.Cell>
                <Table.Cell className="monospace" textAlign="right">{op.kind.toUpperCase()}</Table.Cell>
                <Table.Cell className="monospace" textAlign="center">{parseFloat(op.value).toFixed(4)}</Table.Cell>
                <Table.Cell className="monospace">{op.symbol.toUpperCase()}</Table.Cell>
                <Table.Cell className="monospace">
                    <pre style={{maxWidth: 650, overflowX: 'auto'}}>
                        {JSON.stringify(op.meta, null, 4)}
                    </pre>
                </Table.Cell>
                <Table.Cell><abbr title={moment(op.ts).toString()}>{moment(op.ts).fromNow()}</abbr></Table.Cell>
            </Table.Row>
        );
    }
}

class OperationList extends Component {
    componentDidMount() {
        this.props.root.fetchOperations(this.props.root.router.values);
    }

    render() {
        const {operations} = this.props.root;
        return (
            <div>
                <OperationFilter/>
                <Table striped basic compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign="right">UID</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">KIND</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">VALUE</Table.HeaderCell>
                            <Table.HeaderCell>SYM</Table.HeaderCell>
                            <Table.HeaderCell>META</Table.HeaderCell>
                            <Table.HeaderCell>TIME</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {operations.map((op) => (<OperationRow router={this.props.root.router} key={op.id} op={op}/>))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default compose(
    inject('root'),
    observer
)(OperationList);
