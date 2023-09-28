import { API_URL, collectionEntry, nftEntry } from "@constants";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";



export async function fetchCollections(): Promise<collectionEntry[]> {
    const jsonRes = await fetch('/api/getCollections', {
        method: 'GET',
        cache: 'no-store',
    })
    const res = await jsonRes.json()
    return res;
}

export async function fetchFloored(name: string): Promise<any> {
    const jsonRes = await fetch('/api/getFloored?limit=5&name='+name, {
        method: 'GET',
        cache: 'no-store',
    })
    const res = await jsonRes.json();
    return res
    //return res.map((entry: collectionEntry) => {
    //    entry.image = 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/'+entry.image;
    //    return entry
    //})
}


export async function getNFTData(data: Array<string>): Promise<nftEntry[]> {

    const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL as string);
    const meta = new Metaplex(connection);

    const allPromises: Array<Promise<any>> = []
    var interval_mult = 1


    data.forEach((ele) => {
        const prms = new Promise((resolve) => {
            setTimeout(async () => {
                try {
                    const res = await meta.nfts().findByMint({ mintAddress: new PublicKey(ele), loadJsonMetadata: true })
                    resolve(res);
                } catch (e) {
                    resolve('failed');
                }
            }, 100 * interval_mult)
        })

        allPromises.push(prms)
        interval_mult += 1
    })

    const result = await Promise.allSettled(allPromises)

    const values: nftEntry[] = [];
    for (var entry of result) {
        //@ts-ignore      
        if (entry.value != 'failed') {
            values.push(
                {
                    //@ts-ignore      
                    name: entry.value.name,
                    //@ts-ignore      
                    image: entry.value.json.image,
                    //@ts-ignore
                    mintAddress: entry.value.address,
                    //@ts-ignore
                    tick: entry.value.symbol
                }
            )
        }
    }
    return values;
}

export function adjustDisplayName(originalString: string, replacementString: string): string {
    const parts = originalString.split('#');

    if (parts.length === 2) {
        const replacedString = replacementString + '#' + parts[1];
        return replacedString;
    }

    return originalString;
}