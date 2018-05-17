import React from 'react';
import Operation from './components/operation';
import OperationList from './components/operation_list';
import LoginForm from './components/login';
import WalletList from './components/wallet_list';
import ACLList from './components/acl_list';
import ACLForm from './components/acl_form';
import Withdraw from './components/withdraw';
import WalletForm from './components/wallet_form';

export default {
    '/': { name: 'home', render: <WalletList/>},
    '/acl': { name: 'acls', render: <ACLList/> },
    '/acl/new': { name: 'new_acl', render: <ACLForm action="new"/> },
    '/acl/edit/:pubkey': { name: 'edit_acl', render: <ACLForm action="edit"/> },
    '/wallet/new': { name: 'new_wallet', render: <WalletForm/> },
    '/login': { name: 'login', render: <LoginForm/> },
    '/ops': { name: 'operations', render: <OperationList/> },
    '/ops/:symbol/:uid': { name: 'operations_sym_uid', render: <OperationList/> },
    '/op/wallet/:wid': { name: 'operations_by_wallet', render: <OperationList/> },
    '/op/:kind/:symbol/:uid': { name: 'operation', render: <Operation/> },
    '/withdraw/:symbol/:uid': { name: 'withdraw', render: <Withdraw/> }
}
