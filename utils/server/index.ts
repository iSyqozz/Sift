import { API_URL, collectionEntry, nftEntry } from "@constants";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";


export async function getCollections(): Promise<collectionEntry[]> {
    const jsonRes = await fetch(API_URL + 'marketplace/popular_collections', {
        method: 'GET',
        cache: 'no-store',        
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
    })
    const res = await jsonRes.json();
    return res
}