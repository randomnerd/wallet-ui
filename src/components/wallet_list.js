import React, {Component} from 'react';
import {Table,Button,Icon} from 'semantic-ui-react';
import {compose} from "recompose";
import {inject, observer} from "mobx-react/index";
import WalletFilter from './wallet_filter';

class Wallet extends Component {
    async newAddress() {
        const {uid, symbol} = this.props.wallet;
        const address = await this.props.root.newAddress({uid, symbol});
        console.log(address);
        this.props.root.fetchWallets();
    }
    render() {
        const w = this.props.wallet;
        const {router} = this.props.root;
        return (
            <Table.Row>
                <Table.Cell textAlign="right">{w.uid}</Table.Cell>
                <Table.Cell className="monospace">{w.symbol}</Table.Cell>
                <Table.Cell className="monospace" textAlign="right">{parseFloat(w.balance).toFixed(4)}</Table.Cell>
                <Table.Cell className="monospace">{w.address}</Table.Cell>
                <Table.Cell textAlign="right">
                    <Button.Group size="mini">
                        <Button onClick={() => router.push(`/op/take/${w.symbol}/${w.uid}`)}>Take</Button>
                        <Button onClick={() => router.push(`/op/put/${w.symbol}/${w.uid}`)}>Put</Button>
                        <Button onClick={() => router.push(`/withdraw/${w.symbol}/${w.uid}`)}>Withdraw</Button>
                        <Button onClick={() => router.push(`/op/wallet/${w.id}`)}>Operations</Button>
                        <Button onClick={() => this.newAddress()}>New address</Button>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        );
    }
}

class WalletList extends Component {
    async componentDidMount() {
        await this.props.root.fetchWallets();
    }

    render() {
        const {wallets, router} = this.props.root;
        return (
            <div>
                <WalletFilter/>
                <Table striped basic compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign="right">UID</Table.HeaderCell>
                            <Table.HeaderCell>SYM</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">BAL</Table.HeaderCell>
                            <Table.HeaderCell>ADR</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">
                                <Button onClick={() => router.push(`/wallet/new`)}>
                                    <Icon name="plus"/> New wallet
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {wallets.map((w) => <Wallet root={this.props.root} key={w.id} wallet={w}/>)}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default compose(
    inject('root'),
    observer
)(WalletList);
