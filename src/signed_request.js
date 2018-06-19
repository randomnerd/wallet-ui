import sha256 from 'fast-sha256';
import { Buffer } from 'buffer';

export default function signedRequest(pubkey, privkey, req, url) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(req);
        const hmac = sha256.hmac(Buffer.from(privkey, 'hex'), Buffer.from(body));
        const signature = Buffer.from(hmac).toString('hex');
        fetch(url, {
            body,
            mode: "cors",
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Key": pubkey,
                "X-Auth-Sign": signature,
            }
        }).then(response => response.json()).then(resolve).catch(reject);
    });
}
