
import { Connection, PublicKey, } from "@solana/web3.js";
import { NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { TOKEN_ADDRESS, API_URL } from "@constants";

async function GET(req: Request) {
    try {
        const data = new NextURL(req.url).searchParams.get('address')
        const connection = new Connection(process.env.RPC_URL as string);
        const ownerAddress = new PublicKey(data!);

        let isValid = false
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerAddress, { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') });

        for (var cand in tokenAccounts.value) {
            const address = (tokenAccounts.value[cand].account.data.parsed['info'].mint)
            const amount = tokenAccounts.value[cand].account.data.parsed['info'].tokenAmount['amount']
            console.log(address);
            if (TOKEN_ADDRESS === address  && amount !== '0') {
                isValid = true;
                break
            }
        }
        return NextResponse.json(isValid)
    } catch (e) {
        console.log(e);
        return NextResponse.json(false);
    }
}
export {
    GET,
}

export const dynamic = 'force-dynamic'
