const fs = require('fs');
const path = require('path');
const { Wallets } = require('fabric-network');

async function main() {
    const walletPath = path.join(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const cert = fs.readFileSync(path.join(walletPath, 'user1-cert.pem')).toString();
    const key = fs.readFileSync(path.join(walletPath, 'user1-key.pem')).toString();

    const identity = {
        credentials: {
            certificate: cert,
            privateKey: key
        },
        mspId: 'Org1MSP',
        type: 'X.509'
    };

    await wallet.put('user1', identity);
    console.log('✅ user1 imported into wallet');
}

main();
