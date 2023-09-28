import { API_URL, collectionEntry, nftEntry } from "@constants";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";


export async function getCollections(): Promise<collectionEntry[]> {
    const jsonRes = await fetch(API_URL + 'marketplace/popular_collections', {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Origin": '*'
        }
    })
    const res = await jsonRes.json();
    return res.map((entry: collectionEntry) => {
        entry.image = 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/' + entry.image;
        return entry
    })
}

export async function getFloored(name: string): Promise<any> {
    const jsonRes = await fetch(API_URL + 'collections/' + name + '/listings?limit=5', {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Access-Control-Allow-Origin": '*'
        }
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

    const values: nftEntry[] = []
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