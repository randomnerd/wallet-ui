import { extendObservable, autorun } from 'mobx';
import signedRequest from '../signed_request';
import routes from '../routes';
import router from './router';

export default class Stores {
    constructor() {
        this.router = new router({ routes });
        extendObservable(this, {
            api: {
                url: window.localStorage.getItem('api.url') || "http://localhost:8080/api",
                pubkey: window.localStorage.getItem('api.pubkey') || '',
                privkey: window.localStorage.getItem('api.privkey') || '',
            },
            wallets: [],
            acls: [],
            operations: [],
            popups: []
        });
        autorun(() => {
            if (!this.api.pubkey) this.router.push('/login');
        });
        this.request = (req) => signedRequest(this.api.pubkey, this.api.privkey, req, this.api.url);
        this.fetchOperations = async (params) => {
            const resp = await this.request({method: "getOperations", params});
            this.operations.replace(resp.operations);
            return resp.operations;
        };
        this.fetchWallets = async (params) => {
            const resp = await this.request({method: "getWallets", params});
            this.wallets.replace(resp.wallets);
            return resp.wallets;
        };
        this.fetchACLs = async () => {
            const resp = await this.request({method: "getACLs"})
            this.acls.replace(resp.acls);
        };
        this.walletOp = async (kind, symbol, uid, value) => {
            const resp = await this.request({method: kind, params: { symbol, uid, value }});
            console.log(resp);
            this.router.go(-1);
        };
        this.withdraw = async (symbol, uid, value, addr) => {
            const resp = await this.request({method: "withdraw", params: { symbol, uid, value, addr }});
            console.log(resp);
            this.router.go(-1);
        };
        this.addACL = (params) => {
            return this.request({method: 'addACL', params});
        };
        this.delACL = (params) => {
            return this.request({method: 'delACL', params});
        };
        this.editACL = (params) => {
            return this.request({method: 'editACL', params});
        };
        this.getACL = (params) => {
            return this.request({method: 'getACL', params})
        };
        this.getWallet = (params) => {
            return this.request({method: 'getWallet', params});
        };
        this.newAddress = (params) => {
            return this.request({method: 'newAddress', params})
        };
    }
}
