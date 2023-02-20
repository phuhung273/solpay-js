import {
    Keypair,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    clusterApiUrl,
    Connection,
} from '@solana/web3.js';

export async function callSolana() {

    const cluster = 'devnet';
    const endpoint = clusterApiUrl(cluster);
    const connection = new Connection(endpoint, 'confirmed');

    // Merchant app generates a random public key referenced by the transaction, in order to locate it after it's sent
    const from = Keypair.generate();

    // This just represents the to's keypair for testing, in practice it will have a way of signing already
    const to = Keypair.generate();

    const transaction = new Transaction();

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: LAMPORTS_PER_SOL,
        }),
    );

    sendAndConfirmTransaction(connection, transaction, [from]);
}