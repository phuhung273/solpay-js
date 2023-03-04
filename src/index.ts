import {
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    Connection,
    PublicKey,
} from '@solana/web3.js';

export async function signAndConfirmTransaction(provider: any, from: string, to: string): Promise<string> {
    const cluster = 'devnet';
    const endpoint = clusterApiUrl(cluster);
    const connection = new Connection(endpoint, 'confirmed');

    const fromPubkey = new PublicKey(from);
    const toPubkey = new PublicKey(to);

    const transaction = new Transaction();

    transaction.add(
        SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: LAMPORTS_PER_SOL / 100,
        }),
    );

    let blockhashObj = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;
    transaction.feePayer = fromPubkey;

    const { signature } = await provider.signAndSendTransaction(transaction);
    // Confirm whether the transaction went through or not
    await connection.confirmTransaction(signature);

    //Signature or the txn hash
    console.log("Signature: ", signature);
    return signature;
}