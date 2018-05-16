import request from 'browser-request';
import sha256 from 'fast-sha256';
import {Buffer} from 'buffer';

export default function signedRequest(pubkey, privkey, req, url) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(req);
        const hmac = sha256.hmac(Buffer.from(privkey, 'hex'), Buffer.from(body));
        const signature = Buffer.from(hmac).toString('hex');
        const options = {
            url,
            json: true,
            body: req,
            headers: {
                "X-Auth-Key": pubkey,
                "X-Auth-Sign": signature,
            }
        };

        request.post(options, (err, resp, body) => {
            err ? reject(err, resp) : resolve(body);
        });

    });
}
