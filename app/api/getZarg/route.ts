
import { Connection, PublicKey, AccountInfo } from "@solana/web3.js";
import { NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { TOKEN_ADDRESS} from "@constants";

async function GET(req: Request) {
    try {
        const data = new NextURL(req.url).searchParams.get('address')
        const connection = new Connection(process.env.RPC_URL as string);
        const ownerAddress = new PublicKey(data as string);

        let isValid = false
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerAddress, { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') });


        const [MasterEdition, pdaBump] = PublicKey.findProgramAddressSync([
            Buffer.from('metadata'), new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(), new PublicKey('5tY1iB3VV9oFVV84tDwVWYomUdCHTzKtsdAimRZfup4o').toBuffer(), Buffer.from('edition')
        ], new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'))


        for (var cand in tokenAccounts.value) {

            const address = (tokenAccounts.value[cand].account.data.parsed['info'].mint)
            const amount = tokenAccounts.value[cand].account.data.parsed['info'].tokenAmount['amount']

            if (amount === '0'){
                continue
            }

            if (address === TOKEN_ADDRESS) {
                isValid = true;
                break
            } else {
                try {
                    const [pda, pdaBump] = PublicKey.findProgramAddressSync([
                        Buffer.from('metadata'), new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(), new PublicKey(address).toBuffer(), Buffer.from('edition')
                    ], new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'))

                    const pdaInfo = await connection.getAccountInfo(pda);

                    const parentEdition = new PublicKey(pdaInfo?.data.slice(1, 33) as Buffer)

                    console.log(parentEdition)

                    if ((MasterEdition.toBase58() === parentEdition.toBase58()) && (amount !== '0')) {
                        isValid = true;
                        break
                    }
                } catch {
                    continue
                }
            }

            console.log(address);
        }
        return NextResponse.json(isValid)
    } catch (e) {
        //console.log(e);
        return NextResponse.json(false);
    }
}
export {
    GET,
}

export const dynamic = 'force-dynamic'
